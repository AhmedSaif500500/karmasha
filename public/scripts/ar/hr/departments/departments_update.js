
setActiveSidebar('hr_ar');
//check permissions
pagePermission('view', 'departments_permission');

// let Authentication = true;
// //#region  Authentication
// const department_data = JSON.parse(sessionStorage.getItem('department_data'));
// sessionStorage.removeItem('department_data');
// if (!department_data) {
//   Authentication = false;
//   redirection('departments_view_ar','fail','من فضلك اختر القسم اولا للتعديل , سيتم توجيهك الى صفحه الاقسام')
// };


let department_data = getURLData('data','departments_view_ar','رابط غير صالح : سيتم اعادة توجيهك الى صفحة الاقسام')
function CheckUrlParams (){
  try {
    const x = department_data
    
      if (x && x !== 'noParams'){
          return true
      }else if(x && x === 'noParams'){
            return true
      }else{
          return false
      }
              
  } catch (error) {
      catch_error(error)
      return false
  }
}





const department_name_input = document.querySelector(`#department_name_input`)
const department_info_input = document.querySelector(`#department_info_input`)
const btn_update_department = document.querySelector(`#btn_update_department`)
const btn_delete_department = document.querySelector(`#btn_delete_department`)



function receive_data(){
    try {
        
            department_name_input.value = department_data.department_name            
            department_info_input.value = department_data.legal_info
            page_content.style.display = 'flex'
    } catch (error) {
        catch_error(error)
    }

}



btn_update_department.onclick = async () => {
    try {
        const id = department_data.id
        const name = department_name_input.value.trim();
        const info = department_info_input.value.trim();


        if (!name || !id){
            showAlert('warning','ادخل اسم القسم اولا ')
            return
          }

        const postData = await fetchData_postAndGet(
            '/updateDepartment',
            {id,name,info},
            'departments_permission','update',
            15,
            true,'هل تريد تعديل بيانات القسم ؟',
            true,
            false,'',
            true,'departments_view_ar',
            'حدث خطأ اثناء معالجة البيانات'
        )

    } catch (error) {
        catch_error(error)
    }
}

btn_delete_department.onclick = async () => {
    try {
        const id = department_data.id

        if (!id){
            redirection('departments_view_ar','حدث خطأ اثناء معالجة البيانات : سيتم اعادة توجيك الى صفحة الاقام')
            return
          }


        const postData = await fetchData_postAndGet(
            '/deleteDepartment',
            {id},
            'departments_permission','delete',
            15,
            true,'هل تريد حذف بيانات القسم ؟',
            true,
            false,'',
            true,'departments_view_ar',
            'حدث خطأ اثناء معالجة البيانات'
        )

    } catch (error) {
        catch_error(error)
    }
}

document.addEventListener('DOMContentLoaded', function() {
    try {
        showLoadingIcon(content_space)
        const result = CheckUrlParams(); if (!result) {return};
        receive_data();
            viewMode(true,'departments_permission','view')
            handle_fn_options()
        hideLoadingIcon(content_space)
    } catch (error) {
        hideLoadingIcon(content_space)
        catch_error(error)
    }
});
  

function handle_fn_options(){  
    const newDivs = `
      <div id="fn_option_update_btn" onclick="viewMode(false,'departments_permission','update')">وضع التعديل</div>
      <div id="fn_option_view_btn" onclick="viewMode(true,'departments_permission','view')" style="display: none;">وضع العرض</div>
    `;
    fn_options_div.insertAdjacentHTML('afterbegin', newDivs);
  }
  