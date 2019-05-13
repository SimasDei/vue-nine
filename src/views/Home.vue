<template>
  <div class="home container">
    <div class="card" v-for="smoothie in smoothies" :key="smoothie.id">
      <div class="card-content">
        <i class="material-icons delete" @click="deleteSmoothie(smoothie.id)">delete</i>
        <h2 class="indigo-text">{{smoothie.title}}</h2>
        <ul class="ingredients">
          <li v-for="(ingredient, index) in smoothie.ingredients" :key="index">
            <span class="chip">{{ingredient}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import db from '@/firebase/init';

export default {
  name: 'HomePage',
  data() {
    return {
      smoothies: [],
    };
  },
  methods: {
    deleteSmoothie(smoothieId) {
      // Delete document from Firestore
      db.collection('smoothies')
        .doc(smoothieId)
        .delete()
        .then(() => {
          this.smoothies = this.smoothies.filter(
            smoothie => smoothie.id !== smoothieId,
          );
        });
    },
  },
  created() {
    // Fetch data from Firestore
    db.collection('smoothies')
      .get()
      .then((res) => {
        res.forEach((doc) => {
          const smoothie = doc.data();
          smoothie.id = doc.id;
          this.smoothies.push(smoothie);
        });
      });
  },
};
</script>
<style lang="scss">
.home {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
  margin-top: 60px;

  .card {
    .card-content {
      .delete {
        color: #aaa;
        font-size: 1.4em;
        position: absolute;
        top: 4px;
        right: 4px;
        cursor: pointer;
        &:hover {
          color: #ccc;
        }
      }

      h2 {
        font-size: 1.8em;
        text-align: center;
        margin-top: 0;
      }

      .ingredients {
        margin: 30px auto;

        li {
          display: inline-block;
        }
      }
    }
  }
}
</style>
