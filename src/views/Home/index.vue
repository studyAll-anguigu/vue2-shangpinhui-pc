<template>
  <div>
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <Floor v-for="floor in floorsData" :key="floor.id" :floor="floor"></Floor>
    <Brand></Brand>
  </div>
</template>
<script>
import TypeNav from '@/components/TypeNav';
import ListContainer from '@/components/ListContainer';
import Recommend from '@/components/Recommend';
import Rank from '@/components/Rank';
import Like from '@/components/Like';
import Floor from '@/components/Floor';
import Brand from '@/components/Brand';

import { reqGetHomeFloors } from '@/api/home';
export default {
  name: 'XHome',
  components: {
    TypeNav,
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
  data() {
    return {
      floorsData: [],
    };
  },
  async mounted() {
    const data = await reqGetHomeFloors();
    this.floorsData = data;

    console.log(this.$route);
  },
};
</script>
<style scoped></style>
