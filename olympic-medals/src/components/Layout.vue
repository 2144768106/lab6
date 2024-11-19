<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
    <main>
      <slot></slot>
    </main>

    <footer class="bg-white/80 backdrop-blur-sm border-t border-gray-100">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <p class="text-center text-gray-500 text-sm">
          © {{ new Date().getFullYear() }} 奥运奖牌榜
        </p>
      </div>
    </footer>
  </div>
</template> 