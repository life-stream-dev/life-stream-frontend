<script setup lang="ts">
import {onMounted, ref} from "vue";
import request from "@/utils/request.js";
import {showError, showSuccess} from "@/utils/message.js";
import {Check, CircleCloseFilled, RefreshRight} from "@element-plus/icons-vue";

const deviceData = ref<DeviceInfo[]>([])
const loading = ref<boolean>(false);
const editShow = ref<boolean>(false);
const selectedDevice = ref<DeviceInfo>({
    deviceId: "",
    deviceName: ""
});

const loadData = async () => {
    if (loading.value) {
        return;
    }
    loading.value = true;
    const data = await request.get("/device/list") as ApiResponse<DeviceInfo[]>
    deviceData.value = data.data
    loading.value = false;
}

onMounted(loadData)

const renameDeviceDialog = async (device: DeviceInfo) => {
    selectedDevice.value.deviceId = device.deviceId;
    selectedDevice.value.deviceName = device.deviceName;
    editShow.value = true;
}

const renameDevice = async () => {
    const res = await request.post(`/device/rename/${selectedDevice.value.deviceId}`, {
        name: selectedDevice.value.deviceName
    }) as ApiResponse<boolean>
    if (res.status) {
        showSuccess(res.message)
    } else {
        showError(res.message)
    }
    editShow.value = false;
    await loadData();
}

const toggleDevice = async (device: DeviceInfo, status: boolean) => {
    const res = await request.put(`/device/update/${device.deviceId}`, {status}) as ApiResponse<boolean>
    if (res.status) {
        showSuccess(res.message)
    } else {
        showError(res.message)
    }
}
</script>

<template>
    <el-dialog
        v-model="editShow"
        :close-on-click-modal="false"
        :show-close="false"
        width="700px"
        style="--el-dialog-bg-color: var(--front-bg-color);text-align: left;"
    >
        <template #header>修改设备名称</template>
        <div>
            <span>设备ID</span>
            <el-input v-model="selectedDevice.deviceId" disabled></el-input>
            <div>
                <span>设备名称</span>
                <el-input v-model="selectedDevice.deviceName"></el-input>
            </div>
        </div>
        <template #footer>
            <el-button
                class="footer-btn copy-btn"
                type="primary"
                size="default"
                :icon="CircleCloseFilled"
                @click="editShow = false"
            >取消
            </el-button>
            <el-button
                class="footer-btn confirm-btn"
                type="success"
                size="default"
                :icon="Check"
                @click="renameDevice"
            >确认
            </el-button>
        </template>
    </el-dialog>
    <div class="container">
        <el-button type="primary" @click.prevent.stop="loadData" class="flush" :loading="loading" :icon="RefreshRight">
            刷新数据
        </el-button>
        <el-table :data="deviceData">
            <el-table-column prop="deviceId" label="设备ID"></el-table-column>
            <el-table-column prop="deviceName" label="设备名称"></el-table-column>
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button type="primary" @click.prevent.stop="renameDeviceDialog(scope.row)">修改设备名称
                    </el-button>
                    <el-button type="primary" @click.prevent.stop="toggleDevice(scope.row, true)">ON</el-button>
                    <el-button type="primary" @click.prevent.stop="toggleDevice(scope.row, false)">OFF</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<style scoped lang="scss">
.container {
    margin: 20px;
    min-width: 900px;
    display: flex;
    flex-direction: column;
}

.flush {
    max-width: 100px;
    margin-bottom: 20px;
}

.el-table {
    --el-table-text-color: white;
    --el-table-header-text-color: white;
    --el-table-header-bg-color: var(--front-bg-color);
    --el-table-bg-color: var(--front-bg-color);
    --el-table-fixed-box-shadow: var(--front-bg-color);
    --el-table-tr-bg-color: var(--front-bg-color);
    --el-table-border-color: var(--front-bg-color);
    --el-table-row-hover-bg-color: var(--front-bg-color-hover);
    border-radius: 20px;
}

.el-dialog {
    --el-dialog-bg-color: var(--front-bg-color);
}

span {
    color: white;
}
</style>