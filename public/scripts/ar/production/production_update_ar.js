setActiveSidebar('production_view_ar');

let Authentication = true;
//#region  Authentication
const production_data = JSON.parse(sessionStorage.getItem('production_update_data'));
sessionStorage.removeItem('production_update_data');
if (!production_data) {
  Authentication = false;
  redirection('production_view_ar','fail','من فضلك اختر يوم الانتاج اولا للتعديل , سيتم توجيهك الى صفحه الانتاج والجرد')
};

document.querySelector(`#hidden_id_input`).value = production_data.id_value;
document.querySelector(`#date1`).value = production_data.date_value;
document.querySelector(`#note1_input`).value = production_data.note_value;
document.querySelector(`#production_amount_input`).value = production_data.procution_value;
document.querySelector(`#sales_amount_input`).value = production_data.sales_value;


console.log(document.querySelector(`#date1`).value);



    //#region  save function
    document.querySelector('#btn_update').addEventListener('click',async function () {

            //preparing data
      const id_input = parseInt(document.querySelector(`#hidden_id_input`).value);
      
      const production_amount_input = parseFloat(document.querySelector('#production_amount_input').value.trim()) || 0;
      const sales_amount_input = parseFloat(document.querySelector('#sales_amount_input').value.trim()) || 0;
      const note1_input = document.querySelector('#note1_input').value.trim();
      const date1 = document.querySelector('#date1').value.trim();
      

      const post = await fetchData_postAndGet(
        '/production_update_ar',
        { id_input,production_amount_input,sales_amount_input,note1_input,date1,today},
        'production_permission','update',
        15,
        true,'هل تريد تعديل البيانات ؟',
        false,false,'',
        true,'production_view_ar',
        'حدث خطأ اثناء معالجة البيانات'
      ) 

      });
      


      async function delete_production() {
const id = parseInt(document.querySelector(`#hidden_id_input`).value);
        await fetchDelete1(
          {id},
          'production_permission',
          'هل تريد حذف البيانات الجرد ؟',
          10,
          '/delete_production',
          true,
          'production_view_ar'
        )
      };

      function clear() {
const fieldsToClear = [
'#production_amount_input',
'#sales_amount_input',
'#note1_input',
];
fieldsToClear.forEach(field => {
    document.querySelector(field).value = null;
});

date1.value = today;
redirection('production_view_ar','warning','من  سيتم توجيهك الى صفحه الانتاج والجرد') 
     };
          //#endregion End save Function

          document.querySelector('#btn_delete').addEventListener('click', function () {
            delete_production();
          });    
      
      
      
      
          document.addEventListener("DOMContentLoaded", async function () {
            page_content.style.display = "flex";
          })
