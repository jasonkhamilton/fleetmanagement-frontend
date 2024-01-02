<template>
    <div class="panel panel-default">
        <div class="panel-heading">
            <h2>Create a Service</h2>
        </div>
        <div class="panel-body">
            <form @submit.prevent="submitForm">
                <div class="form-group">
                    <label>Service Name:</label>
                    <input class="form-control" type="text" v-model="serviceName" placeholder="Service Name*" />
                </div>
                <div class="form-group">
                    <label>Interval Type:</label>
                    <select class="form-control" v-model="intervalType" placeholder="Type">
                        <option value="KM">KM</option>
                        <option value="Hours">Hours</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Interval:</label>
                    <input class="form-control" type="text" v-model="interval" placeholder="Interval*" />
                </div>
                <button class="btn btn-fault" type="submit">Submit</button>
            </form>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ConnectAssetToService'
}
</script>