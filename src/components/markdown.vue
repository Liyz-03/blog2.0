<template>
    <div>
        <div id="main">
            <!--      <button @click="tototo">ok</button>-->
            <mavon-editor
                :ishljs="true"
                @change="tototo" id="helo"
                v-model="value"/>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'markdown',
        data() {
            return {
                preview: 'preview',
                value: '',
                cont: ''
            }
        },
        methods: {
            tototo(value, cont) {
                //let element = document.querySelector("#helo");
                //console.log(this.value);
                // console.log(cont);
                console.log(value);
            }
        }
    }
</script>

<style scoped>

</style>
