import axios from "axios";
import toastr from "toastr";
import copy from "copy-to-clipboard";
window.axios = axios;
window.toastr = toastr;
window.copy = copy;

const saveApp = document.getElementById("saveApp");

const createAppModal = new bootstrap.Modal("#createAppModal");
saveApp.addEventListener("click", async (evt) => {
  const save_app_name = document.querySelector('input[name="save_app_name"]');
  const app_name = save_app_name.value;

  const { data } = await axios.post("/apps/save_app", { app_name: app_name });
  if (data.success) {
    toastr.success(data.message);
    createAppModal.hide();
  } else {
    toastr.error("data", data.message);
  }
});
