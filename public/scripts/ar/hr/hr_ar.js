setActiveSidebar('hr_ar');
//check permissions
pagePermission('hr_permission','view');

const departments_btn = document.querySelector(`#departments_btn`)
const employees_btn = document.querySelector(`#employees_btn`)
const effects_btn = document.querySelector(`#effects_btn`)

departments_btn.onclick = function(){
  // sessionStorage.removeItem('effectsConditionsArray');
  window.location.href = "/departments_view_ar";
}

employees_btn.onclick = function(){
  // sessionStorage.removeItem('effectsConditionsArray');
  window.location.href = "/employees_view_ar";
}

effects_btn.onclick = function(){
  sessionStorage.removeItem('effectsViewArray');
  window.location.href = "/effects_view_ar";
}








document.addEventListener('DOMContentLoaded', function() {
    showRedirectionReason();
  });