// بيانات افتراضية للمستخدمين
let users = ["مدير", "مشرف"];
let dashboardStart = new Date();

const loginContainer = document.getElementById("login-container");
const dashboardContainer = document.getElementById("dashboard-container");
const loginForm = document.getElementById("login-form");
const loginMsg = document.getElementById("login-message");
const dashboardStatus = document.getElementById("status-indicator");
const uptimeDiv = document.getElementById("uptime");
const logoutBtn = document.getElementById("logout-btn");
const usersList = document.getElementById("users-list");
const addUserForm = document.getElementById("add-user-form");
const newUserInput = document.getElementById("new-user");
const uploadForm = document.getElementById("upload-form");
const uploadMsg = document.getElementById("upload-message");

function updateUsersView() {
    usersList.innerHTML = "";
    users.forEach((u, idx) => {
        const li = document.createElement("li");
        li.textContent = u;
        if(idx !== 0) { // أول مستخدم "مدير" لا يمكن حذفه
            const delBtn = document.createElement("button");
            delBtn.textContent = "حذف";
            delBtn.onclick = () => { users.splice(idx, 1); updateUsersView(); };
            li.appendChild(delBtn);
        }
        usersList.appendChild(li);
    });
}

if(loginForm) {
    loginForm.onsubmit = function(e){
        e.preventDefault();
        let user = document.getElementById("username").value.trim();
        let pass = document.getElementById("password").value.trim();
        // مثال: أي اسم وكلمة مرور "1234" يصحح الدخول
        if(pass === "1234" && user.length > 0){
            localStorage.setItem("dashboard_user", user);
            showDashboard();
        } else {
            loginMsg.innerText = "بيانات غير صحيحة!";
        }
    };
}

function showDashboard(){
    loginContainer.style.display = "none";
    dashboardContainer.style.display = "";
    document.querySelector("header h1").textContent = "لوحة التحكم - " + (localStorage.getItem("dashboard_user") || "");
    updateUsersView();
    updateUptime();
}

function updateUptime(){
    if(!uptimeDiv) return;
    let now = new Date();
    let ms = now - dashboardStart;
    let totalSeconds = Math.floor(ms/1000);
    let days = Math.floor(totalSeconds/86400);
    let hours = Math.floor((totalSeconds%86400)/3600);
    let minutes = Math.floor((totalSeconds%3600)/60);
    let str = "تشغيل متواصل: ";
    if(days > 0) str += days + " يوم ";
    if(hours > 0) str += hours + " ساعة ";
    str += minutes + " دقيقة";
    uptimeDiv.textContent = str;
}
setInterval(updateUptime, 60000);

if(logoutBtn){
    logoutBtn.onclick = function(){
        localStorage.removeItem("dashboard_user");
        dashboardContainer.style.display = "none";
        loginContainer.style.display = "";
    };
}

// إدارة المستخدمين (إضافة)
if(addUserForm) {
    addUserForm.onsubmit = function(e){
        e.preventDefault();
        let nu = newUserInput.value.trim();
        if(nu.length > 0 && !users.includes(nu)){
            users.push(nu);
            updateUsersView();
            newUserInput.value = "";
        }
    };
}

// رفع الملفات (وهمي)
if(uploadForm){
    uploadForm.onsubmit = function(e){
        e.preventDefault();
        const input = document.getElementById("file-input");
        if(input.files.length === 0){
            uploadMsg.innerText = "يرجى اختيار ملف!";
            return;
        }
        uploadMsg.innerText = `تم رفع "${input.files[0].name}" بنجاح (وهمياً)!`;
        setTimeout(()=>{uploadMsg.innerText = "";}, 3000);
        uploadForm.reset();
    };
}

// للتحقق إذا سبق وتم تسجيل الدخول
window.onload = function(){
    if(localStorage.getItem("dashboard_user")){
        showDashboard();
    }
}
