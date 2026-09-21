<template>
  <div class="reference-page">
    <header class="reference-hero">
      <p class="eyebrow">Nested route example</p>
      <h1>Settings</h1>
      <p>The child view below is rendered by a nested RouterView.</p>
    </header>
    <nav class="segmented">
      <RouterLink to="/settings/profile">Profile</RouterLink
      ><RouterLink to="/settings/notifications">Notifications</RouterLink>
    </nav>
    <section class="nested-view"><RouterView /></section>
  </div>
</template>
