console.log("Toby Bot Hosting Loaded 🚀");

// محاكاة رفع الملفات
function uploadBot() {
  const fileInput = document.getElementById("uploadBot");
  if(fileInput.files.length === 0) return alert("اختر ملف البوت أولاً!");
  alert(`✅ تم رفع ${fileInput.files[0].name} (محاكاة فقط)`);
}

// محاكاة تشغيل البوت
function startBot() {
  alert("✅ تم تشغيل البوت (محاكاة)");
}

// محاكاة إيقاف البوت
function stopBot() {
  alert("⛔ تم إيقاف البوت (محاكاة)");
}
