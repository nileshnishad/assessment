<template>
  <button
    :class="[computedClass, sizeClass, shapeClass, customClass]"
    @click="onClick"
    :disabled="disabled"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    type: {
      type: String,
      default: 'primary',
      validator: value => ['primary', 'secondary', 'success', 'danger', 'warning'].includes(value),
    },
    size: {
      type: String,
      default: 'md',
      validator: value => ['sm', 'md', 'lg'].includes(value),
    },
    shape: {
      type: String,
      default: 'rounded',
      validator: value => ['rounded', 'pill', 'square'].includes(value),
    },
    customClass: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    computedClass() {
      return `btn btn-${this.type}`;
    },
    sizeClass() {
      return {
        sm: 'px-2 py-1 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
      }[this.size];
    },
    shapeClass() {
      return {
        rounded: 'rounded',
        pill: 'rounded-full',
        square: 'rounded-none',
      }[this.shape];
    },
  },
  methods: {
    onClick(event) {
      this.$emit('click', event);
    },
  },
};
</script>

<style>
.btn {
  @apply inline-flex items-center justify-center font-medium transition duration-150 ease-in-out focus:outline-none;
}
.btn-primary {
  @apply bg-blue-500 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-300;
}
.btn-secondary {
  @apply bg-gray-500 text-white hover:bg-gray-600 focus:ring-2 focus:ring-gray-300;
}
.btn-success {
  @apply bg-green-500 text-white hover:bg-green-600 focus:ring-2 focus:ring-green-300;
}
.btn-danger {
  @apply bg-red-500 text-white hover:bg-red-600 focus:ring-2 focus:ring-red-300;
}
.btn-warning {
  @apply bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-300;
}
</style>
