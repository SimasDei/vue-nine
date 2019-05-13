<template>
  <div class="add-smoothie container">
    <h2 class="center-align indigo-text">Add smoothie</h2>
    <form @submit.prevent="addSmoothie">
      <div class="field title">
        <label for="title">Smoothie name</label>
        <input type="text" name="title" v-model="title">
      </div>
      <div v-for="(ingredient, index) in ingredients" :key="index" class="field">
        <label for="ingredient">Ingredient:</label>
        <input type="text" name="ingredient" v-model="ingredients[index]">
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
        <button class="btn pink">Add Smoothie</button>
      </div>
    </form>
  </div>
</template>
<script>
import slugify from 'slugify';
import db from '@/firebase/init';

export default {
  name: 'AddSmoothie',
  data() {
    return {
      title: null,
      slug: null,
      another: null,
      ingredients: [],
      feedback: null,
    };
  },
  methods: {
    addSmoothie() {
      if (this.title) {
        this.feedback = null;
        this.slug = slugify(this.title, {
          replacement: '-',
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true,
        });
        db.collection('smoothies')
          .add({
            title: this.title,
            slug: this.slug,
            ingredients: this.ingredients,
          })
          .then(() => this.$router.push('/'));
      } else {
        this.feedback = 'You must name the Smoothie';
      }
    },
    addIngredient() {
      if (this.another) {
        this.ingredients.push(this.another);
        this.another = null;
        this.feedback = null;
      } else {
        this.feedback = 'You must add a correct value (e.g. Banana)';
      }
    },
  },
};
</script>
<style lang="scss">
.add-smoothie {
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;

  h2 {
    font-size: 2em;
    margin: 0 auto 20px auto;
  }

  .field {
    margin: 20px auto;
  }
}
</style>
