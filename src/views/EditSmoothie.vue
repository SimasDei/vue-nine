<template>
  <div v-if="smoothie" class="edit-smoothie container">
    <h2>Edit {{smoothie.title}}</h2>
    <form @submit.prevent="editSmoothie">
      <div class="field title">
        <label for="title">Smoothie name</label>
        <input type="text" name="title" v-model="smoothie.title">
      </div>
      <div v-for="(ingredient, index) in smoothie.ingredients" :key="index" class="field">
        <label for="ingredient">Ingredient:</label>
        <input type="text" name="ingredient" v-model="smoothie.ingredients[index]">
        <i class="material-icons delete" @click="deleteIngredient(ingredient)">delete</i>
      </div>
      <div class="field add-ingredient">
        <label for="add-ingredient">Add Ingredient</label>
        <input
          type="text"
          name="add-ingredient"
          @keydown.tab.prevent="addIngredient"
          v-model="another"
        >
      </div>
      <div class="field center-align">
        <p class="red-text" v-if="feedback">{{feedback}}</p>
        <button class="btn pink">Update Smoothie</button>
      </div>
    </form>
  </div>
</template>
<script>
import slugify from 'slugify';
import db from '@/firebase/init';

export default {
  name: 'EditSmoohie',
  data() {
    return {
      smoothie: null,
      another: null,
      feedback: null,
    };
  },
  created() {
    const ref = db
      .collection('smoothies')
      .where('slug', '==', this.$route.params.slug);
    ref.get().then((result) => {
      result.forEach((doc) => {
        this.smoothie = {
          id: doc.id,
          ...doc.data(),
        };
      });
    });
  },
  methods: {
    editSmoothie() {
      if (this.smoothie.title) {
        this.feedback = null;
        this.smoothie.slug = slugify(this.smoothie.title, {
          replacement: '-',
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true,
        });
        db.collection('smoothies')
          .doc(this.smoothie.id)
          .update({
            title: this.smoothie.title,
            slug: this.smoothie.slug,
            ingredients: this.smoothie.ingredients,
          })
          .then(() => this.$router.push('/'));
      } else {
        this.feedback = 'You must name the Smoothie';
      }
    },
    addIngredient() {
      if (this.another) {
        this.smoothie.ingredients.push(this.another);
        this.another = null;
        this.feedback = null;
      } else {
        this.feedback = 'You must add a correct value (e.g. Banana)';
      }
    },
    deleteIngredient(ing) {
      this.smoothie.ingredients = this.smoothie.ingredients.filter(
        ingredient => ingredient !== ing,
      );
    },
  },
};
</script>
<style lang="scss">
.edit-smoothie {
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;

  h2 {
    font-size: 2em;
    margin: 0 auto 20px auto;
  }

  .field {
    position: relative;
    margin: 20px auto;

    .delete {
      position: absolute;
      right: 0;
      bottom: 16px;
      color: #aaa;
      font-size: 1.4em;
      cursor: pointer;
      &:hover {
        color: #ccc;
      }
    }
  }
}
</style>
