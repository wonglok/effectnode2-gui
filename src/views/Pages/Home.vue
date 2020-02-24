<template>
  <div>
     <hsc-menu-style-metal class="position: fixed; z-index: 2;">
        <hsc-menu-bar style="border-radius: 0 0 4pt 0;">
            <hsc-menu-bar-item label="File">
                <hsc-menu-item label="New" @click="window.alert('New')" />
                <hsc-menu-item label="Open" @click="window.alert('Open')" />
                <hsc-menu-separator/>
                <hsc-menu-item label="Save" @click="window.alert('Save')" :disabled="true" />
                <hsc-menu-item label="Export to">
                    <hsc-menu-item label="PDF" />
                    <hsc-menu-item label="HTML" />
                </hsc-menu-item>
            </hsc-menu-bar-item>
            <hsc-menu-bar-item label="Edit">
                <hsc-menu-item label="Undo" keybind="meta+z" @click="window.alert('Undo')" />
                <hsc-menu-separator/>
                <hsc-menu-item label="Cut" keybind="meta+x" @click="window.alert('Cut')" />
                <hsc-menu-item label="Copy" keybind="meta+c" @click="window.alert('Copy')" />
                <hsc-menu-item label="Paste" keybind="meta+v" @click="window.alert('Paste')" :disabled="true" />
            </hsc-menu-bar-item>
        </hsc-menu-bar>
    </hsc-menu-style-metal>

    <hsc-window-style-metal style="position: fixed; z-index: 1">

      <hsc-window title="Window 1" >
          Parameters:
          <fieldset>
              <legend>&alpha;</legend>
              <input type="range" />
          </fieldset>
          <fieldset>
              <legend>&beta;</legend>
              <input type="range" />
          </fieldset>
      </hsc-window>
    </hsc-window-style-metal>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    ...require('../index.js')
    // HelloWorld
  }
}
</script>
