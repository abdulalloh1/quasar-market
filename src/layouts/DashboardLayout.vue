<template>
  <q-layout view="lHh Lpr lFf">
    aa
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Dashboard
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          Menu
        </q-item-label>
        <q-item
          v-for="link in essentialLinks"
          :key="link.title"
          clickable
          :to="link.link"
        >
          <q-item-section
            v-if="link.icon"
            avatar
          >
            <q-icon
              :name="link.icon"
              right
            />
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ link.title }}</q-item-label>
            <q-item-label caption>
              {{ link.caption }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

const linksData = [
  {
    title: "Products",
    caption: "CRUD",
    icon: "forest",
    link: '/dashboard/products'
  }
];

export default {
  name: "MainLayout",
  data() {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData
    };
  }
};
</script>
