<template>
    <div>
        <h1>Home</h1>

        <img alt="Vue logo" src="@/assets/logo.png">
        <DragDrop msg="test"/>

        <v-row
            justify="space-around"
            no-gutters
        >
            <v-col cols="3">
            <v-text-field
                v-model="trip.start"
                label="Start date"
                type="date"
            ></v-text-field>
            </v-col>

            <v-col cols="3">
            <v-text-field
                v-model="trip.end"
                label="End date"
                type="date"
            ></v-text-field>
            </v-col>
        </v-row>
    </div>
</template>

<script setup>
    import DragDrop from '@/components/DragDrop.vue'
    import { ref } from 'vue'

    const trip = ref({name: '', start: null, end: null})

</script>