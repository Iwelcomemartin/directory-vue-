
<template>
  <div id="json-view">
    <json-view-item
      id="root-item"
      :data="parsed"
      :maxDepth="maxDepth"
      :styles="customStyles"
      v-on:selected="itemSelected"
      :canSelect="hasSelectedListener"
    />
  </div>
</template>

<script lang="ts">
import Vue, { VueConstructor } from "vue";
import JSONViewItem from "./JSONViewItem.vue";
export default Vue.extend({
  name: "json-view",
  props: {
    data: {
      required: true,
      type: Object
    },
    rootKey: {
      type: String,
      required: false,
      default: "root"
    },
    maxDepth: {
      type: Number,
      required: false,
      default: 1
    },
    styles: {
      type: Object,
      required: false
    }
  },
  components: {
    "json-view-item": JSONViewItem
  },
  methods: {
    build: function(
      key: string,
      val: any,
      depth: number,
      path: string,
      includeKey: boolean
    ): object {
      if (val.children) {
        // Build Object
        let children = [];
        for (let child of val.children) {
          children.push(
            this.build(
              child.text,
              child,
              depth + 1,
              child.path,
              true
            )
          );
        }
        return {
          key: key,
          type: "directory",
          depth: depth,
          path: path,
          length: children.length,
          children: children
        };
      }
      else {
        // Build Value
        return {
          key: val.text,
          type: "file",
          path: val.path,
          depth: depth,
          value: val
        };
      }
    },
    itemSelected: function(data: object): void {
      this.$emit("selected", data);
    }
  },
  computed: {
    parsed: function(): object {
      return this.build(this.rootKey, { ...this.data }, 0, this.data.path, true);
    },
    customStyles: function(): object {
      const target = {
        key: "#002b36",
        valueKey: "#073642",
        string: "#268bd2",
        number: "#2aa198",
        boolean: "#cb4b16",
        null: "#6c71c4",
        arrowSize: "6px"
      };
      return Object.assign(target, this.styles);
    },
    hasSelectedListener(): boolean {
      return Boolean(this.$listeners && this.$listeners.selected);
    }
  }
});
</script>

<style lang="scss">
#json-view {
  width: 100%;
  height: auto;
}
#root-item {
  margin-left: 0;
}
</style>