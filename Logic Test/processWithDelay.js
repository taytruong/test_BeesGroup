"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let isCancel = false;
function cancelProcess() {
    isCancel = true;
}
function processWithDelay(numbers_1) {
    return __awaiter(this, arguments, void 0, function* (numbers, delayTime = 1000, onProgress) {
        // Ném lỗi nếu không phải mảng
        if (!Array.isArray(numbers)) {
            throw new Error("Input must be an array");
        }
        // Kiểm tra xem mảng có rỗng không
        if (numbers.length === 0) {
            console.log("Eror array empty");
            return Promise.resolve();
        }
        // Xử lý từng value trong mảng
        for (let i = 0; i < numbers.length; i++) {
            // Dừng quá trình nếu bị hủy
            if (isCancel) {
                console.log("Process cancelled");
                return;
            }
            // Ném lỗi nếu không phải số
            if (typeof numbers[i] !== "number") {
                throw new Error("Input must be not number");
            }
            yield new Promise((resolve) => setTimeout(resolve, delayTime));
            console.log(`// After ${numbers[i]} second : ${numbers[i]}`);
            // Tracking
            if (onProgress) {
                const progress = ((i + 1) / numbers.length) * 100;
                onProgress(progress);
            }
        }
    });
}
processWithDelay([1, 2, 3], 1000, (progress) => {
    console.log(`Process: ${progress.toFixed(2)} %`);
});
// gọi hàm khi muốn cancel
// cancelProcess();
