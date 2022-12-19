<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated
      class="bg-main-secondary">
      <q-toolbar>
        <q-btn flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer" />

        <q-toolbar-title>
          Lanche Bem
        </q-toolbar-title>

        <q-btn-dropdown flat
          color="white"
          icon="person">
          <q-list>
            <q-item clickable
              v-close-popup
              @click="handleLogout">
              <q-item-section>
                <q-item-label>Sair</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-main-secondary">
      <q-list>
        <q-item-label header
          class="text-white">
          Menu
        </q-item-label>

        <EssentialLink v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import notify from 'src/composables/notify'
import EssentialLink from 'src/components/app/EssentialLink.vue'
import useStorageStore from 'src/stores/storage'

const linksList = [
  {
    title: 'Painel',
    caption: '',
    icon: 'mdi-home',
    routeName: 'dashboard'
  }
]

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const $q = useQuasar()
    const { notifyError, notifySuccess } = notify()
    const store = useStorageStore()
    const router = useRouter()
    const leftDrawerOpen = ref(false)

    const handleLogout = async () => {
      $q.dialog({
        title: 'Logout',
        message: 'Você realmente quer sair?',
        cancel: true,
        persistent: true
      }).onOk(async () => {
        try {
          const message = await store.logout()
          notifySuccess(message)
          router.push({ name: 'login' })
        } catch (error) {
          notifyError(error)
        }
      })
    }

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      handleLogout
    }
  }
})
</script>
