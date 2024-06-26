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
          Come Bem
        </q-toolbar-title>

        <q-btn-dropdown flat
          color="white"
          icon="person">
          <q-list>
            <q-item clickable
              v-close-popup
              :to="{ name: 'profile' }">
              <q-item-section>
                <q-item-label>Perfil</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable
              v-close-popup
              :to="{ name: 'change-password' }">
              <q-item-section>
                <q-item-label>Alterar senha</q-item-label>
              </q-item-section>
            </q-item>
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
      class="bg-main-secondary"
      :breakpoint="1439.99">
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
      <router-view class="px-responsive-sm q-py-lg" />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { LocalStorage, SessionStorage, useQuasar } from 'quasar'
import notify from 'src/composables/notify'
import EssentialLink from 'src/components/app/others/EssentialLink.vue'
import useStorageStore from 'src/stores/storage'
import CustomDialog from 'src/components/common/CustomDialog.vue'

const linksList = [
  {
    title: 'Painel',
    caption: null,
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
    const { notifyError } = notify()
    const $q = useQuasar()
    const store = useStorageStore()
    const router = useRouter()
    const leftDrawerOpen = ref(false)

    const handleLogout = async () => {
      $q.dialog({
        component: CustomDialog,
        componentProps: {
          message: 'Você realmente quer sair?',
          warning: true
        }
      }).onOk(async () => {
        try {
          await store.logout()
          router.push({ name: 'login' })
          store.$reset()
          LocalStorage.clear()
          SessionStorage.clear()
        } catch (error) {
          router.push({ name: 'login' })
          notifyError(error)
          store.$reset()
          LocalStorage.clear()
          SessionStorage.clear()
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
