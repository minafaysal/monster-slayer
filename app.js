function generateRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

const app = Vue.createApp({
  data() {
    return {
      monsterHealth: 100,
      playerHealth: 100,
    };
  },
  computed: {
    monsterBarStyles() {
      return { width: this.monsterHealth + "%" };
    },
    playerBarStyles() {
      return { width: this.playerHealth + "%" };
    },
  },
  methods: {
    attackMonster() {
      const attackVlaue = generateRandomValue(5, 12);
      console.log("attackMonster");
      this.monsterHealth -= attackVlaue;
      this.attackPlayer();
    },
    attackPlayer() {
      const attackVlaue = generateRandomValue(8, 15);
      this.playerHealth -= attackVlaue;
    },
  },
});

app.mount("#game");
