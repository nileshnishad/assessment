<template>
  <div id="app" :class="[themeClass, 'min-h-screen', 'bg-gray-100', 'dark:bg-gray-100']">
    <router-view></router-view>
  </div>
</template>

<script setup>
import { useTheme } from './composables/useTheme.js';
const { themeClass } = useTheme();
</script>

<style>
@import './styles/variables.css';
</style>
