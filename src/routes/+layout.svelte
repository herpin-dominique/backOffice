<script>
  import Navbar from "$lib/components/Navbar.svelte";
  import Footer from "$lib/components/Footer.svelte";
</script>

<div class="layout">
  <Navbar />
  <admin />
  <slot />
  <Footer />
</div>
