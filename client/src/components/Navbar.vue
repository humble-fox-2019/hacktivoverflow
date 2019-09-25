<template>
  <b-row>
    <b-container fluid>
      <b-navbar toggleable="sm" type="light" variant="light">
        <b-container>
          <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>

          <b-navbar-brand style="color: #FB9A3F">Too<span style="font-size: 1.4rem; font-weight: bold">Overflow</span></b-navbar-brand>

          <b-collapse id="nav-text-collapse" is-nav>
              <b-navbar-nav>
                  <b-nav-text>Navbar text</b-nav-text>
              </b-navbar-nav>
          </b-collapse>
        </b-container>
      </b-navbar>
    </b-container>
  </b-row>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>

<style>

</style>