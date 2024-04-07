function generateRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

const app = Vue.createApp({
  data() {
    return {
      monsterHealth: 100,
      playerHealth: 100,
      counterSpacialAttck: 0,
    };
  },
  computed: {
    monsterBarStyles() {
      return { width: this.monsterHealth + "%" };
    },
    playerBarStyles() {
      return { width: this.playerHealth + "%" };
    },
    myUseSpacialAttack() {
      return this.counterSpacialAttck % 3 !== 0;
    },
  },
  methods: {
    attackMonster() {
      const attackVlaue = generateRandomValue(5, 12);
      console.log("attackMonster");
      this.monsterHealth -= attackVlaue;
      this.counterSpacialAttck++;
      this.attackPlayer();
    },
    attackPlayer() {
      const attackVlaue = generateRandomValue(8, 15);
      this.playerHealth -= attackVlaue;
    },
    spacialAttack() {
      const attackVlaue = generateRandomValue(15, 25);
      this.monsterHealth -= attackVlaue;
      this.counterSpacialAttck++;
      this.attackPlayer();
    },
  },
});

app.mount("#game");
