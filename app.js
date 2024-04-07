function generateRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

const app = Vue.createApp({
  data() {
    return {
      monsterHealth: 100,
      playerHealth: 100,
      counterSpacialAttck: 0,
      winner: null,
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
  watch: {
    monsterHealth(vlaue) {
      if (vlaue <= 0 && this.playerHealth <= 0) {
        this.winner = "draw";
      } else if (vlaue <= 0) {
        this.winner = "player";
      }
    },
    playerHealth(vlaue) {
      if (vlaue <= 0 && this.monsterHealth <= 0) {
        this.winner = "draw";
      } else if (vlaue <= 0) {
        this.winner = "monster";
      }
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
    healPlayer() {
      this.counterSpacialAttck++;
      const healVlaue = generateRandomValue(10, 25);
      if (this.healVlaue + this.playerHealth > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healVlaue;
      }
      this.attackPlayer();
    },
  },
});

app.mount("#game");
