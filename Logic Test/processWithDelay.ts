let isCancel = false;
function cancelProcess() {
  isCancel = true;
}
async function processWithDelay(
  numbers: number[],
  delayTime: number = 1000,
  onProgress?: (progress: number) => void
): Promise<void> {
  // Ném lỗi nếu không phải mảng
  if (!Array.isArray(numbers)) {
    throw new Error("Input must be an array");
  }
  // Kiểm tra xem mảng có rỗng không
  if (numbers.length === 0) {
    console.log("Error array empty");
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
    await new Promise((resolve) => setTimeout(resolve, delayTime));
    console.log(`// After ${numbers[i]} second : ${numbers[i]}`);

    // Tracking
    if (onProgress) {
      const progress = ((i + 1) / numbers.length) * 100;
      onProgress(progress);
    }
  }
}

processWithDelay([1, 2, 3], 1000, (progress) => {
  console.log(`Process: ${progress.toFixed(2)} %`);
});

// gọi hàm khi muốn cancel
// cancelProcess();
