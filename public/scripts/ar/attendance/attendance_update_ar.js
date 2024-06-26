
setActiveSidebar('attendance_ar');
//#region  Authentication
let Authentication = true;
//#region  Authentication
const attendance_data = JSON.parse(sessionStorage.getItem('attendance_data'));
sessionStorage.removeItem('attendance_data');
if (!attendance_data) {
  Authentication = false;
  redirection('attendance_ar','fail','من فضلك اختر من الجدول اولا للتعديل , سيتم توجيهك الى صفحه المؤثرات')
};

const attendance_id = attendance_data.attendance_id;




//#endregion end-Authentication


//#region get data from server
async function get_attendance_data_fn() {
    try {

        if(!Authentication){
            return;
        }
            //!2: send id to server then receive data from server response
            // تجهيز البيانات للإرسال إلى الخادم
            const posted_elements = {
                attendance_id,
            };
            
            // إرسال البيانات إلى الخادم
            const response = await fetch('/updateattendance', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(posted_elements)
            });

              const data = await  response.json();
              
           
                    if (data.success) {
                        array1 = data.rows[0]; /* اول صف فقط فى الروز الى فيه البيانات */
                        show_data();
                    } else {
                        console.log("Error adding employee:", data.message); 
                    };

    } catch (error) {
        console.error('Error getting employee data:', error.message);
    };
};


function show_data() {
    try {
        if(!Authentication){
            return;
        }
document.querySelector('#id_hidden_input').value = array1.employee_id;
document.querySelector(`#date_input`).value = array1.datex;
document.querySelector('#dropdown_select_input').value = array1.employee_name; 
document.querySelector('#days_input').value =  array1.days;
document.querySelector('#hours_inpu').value = array1.hours;
document.querySelector('#values_input').value = array1.values;
document.querySelector('#note_inpute').value = array1.note;
    } catch (error) {
        console.error('error in show_data',error.message)
    };
};

//! set colors 
function checkValueAndSetColor(numberInputId) {
    
    const numberInput = document.querySelector('#' + numberInputId);
    if (numberInput.value !== '') {
      const value = parseFloat(numberInput.value);
      if (value > 0) {
        numberInput.style.backgroundColor = 'var(--btn_save_backcolor)';
        numberInput.style.color = 'var(--btn_color)';
      } else if (value < 0) {
        numberInput.style.backgroundColor = 'var(--btn_cancel_backcolor)';
        numberInput.style.color = 'var(--btn_color)';
      } else {
        numberInput.style.backgroundColor = 'var(--input_text_background_color)';
        numberInput.style.color = 'var(--Font_Color)';
      };
    };
};
  

  document.querySelector('#days_input').addEventListener('input', function () {checkValueAndSetColor('days_input')});
  document.querySelector('#hours_inpu').addEventListener('input', function () {checkValueAndSetColor('hours_inpu')});
  document.querySelector('#values_input').addEventListener('input', function () {checkValueAndSetColor('values_input')});
  



//#endregion END- get data from server


//#region get employees data from server to fill dropdown

let data = [];
let array1 = [];
let slice_Array1 = [];


// تحضير البيانات من السيرفر
async function getEmployeesData_fn() {
    if(!Authentication){
        return;
    }

  const response = await fetch("/getEmployeesData1");
  data = await response.json();

  // تحديث array1 بنتيجة الـ slice
  array1 = data.slice();
};

async function showFirst50RowAtTheBegening() {
  await getEmployeesData_fn()
  slice_Array1 = array1.slice(0, 50); // انشاء مصفوفه جديده تحتوى على اول 50 سطر من البيانات فقط
  fillAttendancetable()
}



async function fillAttendancetable() {
  //  @@ هاااااام جدا 
  // el properties beta3 kol 3amod ytm wad3ha fe el <thead></thead> And <tbody></tbody> And <tfoor></tfoor> kol wa7ed lewa7do
  // el properties hya :
  // 1 : display: none; > fe 7alt enak ardt e5fa2 el 3amod -- display: ; hatspha fadya fe7alt enak ardt tezhr el 3amod
  // 2 : white-space: nowrap;  fe 7alt enak ardt en el text maylfsh ta7t ba3do  -- white-space: wrap; fe 7alt enak ardt en el tezt ylf
  // 3 : width: auto;  fe 7alt enak ardt en ykon 3ard el 3amod 3ala ad el mo7tawa -- width: 100%; fe 7alt enak ardt en el 3amod ya5od ba2y el mesa7a el fadla
  // 4 : text-align: center / left / right / justify   da 3ashan tet7km fe el text ymen wala shemal wala fe ele nos

  // إعداد رأس الجدول
  let tableHTML = `<table id="employees_table" class="review_table">
                        <tbody>`;

  // إضافة صفوف الجدول بناءً على البيانات
  // slice_Array1 = ""; // تفريغ المصفوفه
  slice_Array1.forEach(row => {
    tableHTML += `<tr onclick="selectedRow(this)">
                          <td style="display: none;" >${row.id}</td>
                          <td style="width: 100%;">${row.employee_name}</td>
                        </tr>`;
  });

  tableHTML += `</tbody>
      <tfoot> 
      <!--
          <tr class="table_totals_row">
              <td id="tfooter1"></td>
              <td id="tfooter2" style="display: none;"></td>
          </tr>
        -->
          <tr id="table_fotter_buttons_row">
              <td colspan="2">  <!-- da awel 3amod fe ele sad tr han7othan5elh han3mel merge lkol el columns fe column wa7ed 3ashan n7ot el 2 buttons hat3mel colspan le3add el 3awamed kolaha -->
                  <div class='flex_H'>
                      <button class="table_footer_btn"  id="w1" onclick="ShowAllDataInAttendanceTable()">All</button>
                      <button class="table_footer_btn"  id="w2" onclick="showFirst50RowInAttendanceTable()">50</button>
                  </div>
              </td>
          </tr>

      </tfoot>`;

  // إغلاق الجدول
  tableHTML += '</table>';

  // تحديث محتوى الصفحة بناءً على البيانات
  document.querySelector('#dropdownItems').innerHTML = tableHTML;
  //  عمليات صف الاجمالى 
  // جمع القيم في العمود رقم 6


  // document.getElementById("tFooter6").textContent = totalColumn_Valuu;
  // document.getElementById("tfooter1").textContent = slice_Array1.length; //  عدد الصفوف

  // hide footer btn if rows < 50
  if (array1.length > 0 && array1.length <= 50) {
    document.querySelector('#table_fotter_buttons_row').style.display = "none";
  } else if (array1.length < 1) {
    document.querySelector('#table_fotter_buttons_row').innerHTML = `<td colspan='2' class="td_no_result">لا نتائج</td>`;
  };


};

// search in attendanceTable
async function performSearch() {

  // الحصول على قيمة البحث
  const searchValue = document.querySelector('#dropdown_search_input').value.trim().toLowerCase();


  // فلترة البيانات بناءً على قيمة البحث
  array1 = data.filter(row => {

    // التحقق من أن employee.id و employee.name ليستان فارغتين
    const idMatch = row.id && row.id.toString().toLowerCase().includes(searchValue);
    const nameMatch = row.employee_name && row.employee_name.toString().toLowerCase().includes(searchValue);
    return idMatch || nameMatch;
  });

  slice_Array1 = array1.slice(0, 50); // انشاء مصفوفه جديده تحتوى على اول 50 سطر من البيانات فقط
  fillAttendancetable()
}

async function ShowAllDataInAttendanceTable() {
  showAlert('info', 'ان ظهار كامل البيانات فى القائمة المنسدله لا يؤثر على عمليه البحث فى البيانات')
  slice_Array1 = array1.slice(); // انشاء مصفوفه جديده تحتوى على اول 50 سطر من البيانات فقط
  await fillAttendancetable()

};

async function showFirst50RowInAttendanceTable() {
  slice_Array1 = array1.slice(0, 50); // انشاء مصفوفه جديده تحتوى على اول 50 سطر من البيانات فقط
  await fillAttendancetable()
};


// تحديد الخيار المختار وإخفاء القائمة
function selectedRow(row) {
  document.querySelector('#id_hidden_input').value = row.cells[0].textContent; // row.id
  document.querySelector('#dropdown_select_input').value = row.cells[1].textContent; // row.employee_name
  hideDropdown();
};




//!--------------------------------------------------------------


// إظهار/إخفاء القائمة
function toggleDropdown() {
  if (dropdown_menue.style.display === "none") {
    measureDistanceToBottom();
    showDropdown();

  } else {
    measureDistanceToBottom();
    hideDropdown();
  }
}

// إظهار القائمة
async function showDropdown() {
  await showFirst50RowAtTheBegening();
  dropdown_menue.style.display = "block";
}

// إخفاء القائمة
function hideDropdown() {
  dropdown_menue.style.display = "none";
  document.querySelector('#dropdown_search_input').value = ""
}

// إظهار/إخفاء القائمة

dropdown_select.addEventListener("click", toggleDropdown);

// إخفاء القائمة عند فقدان التركيز
document.addEventListener("click", (event) => {
  if (
    !document.querySelector('#dropdown_select').contains(event.target) &&
    !document.querySelector('#dropdown_menue').contains(event.target) &&
    !event.target.closest('#employees_table') // تحقق مما إذا كانت النقرة ليست داخل الجدول
  ) {
    // alert(`i will hide menue now`);
    hideDropdown();
  }
});

// إخفاء القائمة عند الضغط على مفتاح الهروب
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    hideDropdown();
  }
});

//#region  جعل القائمه تفتح الى اعلى او لاسفل حسب الافضل

function measureDistanceToBottom() {
  const dropdown_container = document.querySelector('#dropdown_container'); // el main container


  // الحصول على معلومات الحجم والموقع النسبي للعنصر
  const rect = dropdown_container.getBoundingClientRect();

  // الحصول على ارتفاع النافذة الرئيسية للمتصفح
  const windowHeight = window.innerHeight;

  // حساب المسافة بين العنصر والحافة السفلية للشاشة
  const distanceToBottom = windowHeight - rect.bottom;

  // حساب المسافة بوحدة REM
  // الحصول على حجم الخط الأساسي وتحويل المسافة إلى REM
  const fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
  const distanceToBottomRem = distanceToBottom / fontSize;

  if (distanceToBottomRem < 21) {  // 5aleh nafs rl hight beta3 el drop_menue + 1 
    dropdown_menue.classList.add("dropdown_menue_Open_top");
    dropdown_menue.classList.remove("dropdown_menue_Open_bottom");
  } else {
    dropdown_menue.classList.add("dropdown_menue_Open_bottom");
    dropdown_menue.classList.remove("dropdown_menue_Open_top");
  }

  // طباعة المسافة بوحدة REM إلى وحدة تحكم المتصفح

  // يستدعي الدالة عند حدوث التمرير أو تغيير حجم الشاشة
  window.addEventListener('scroll', measureDistanceToBottom);
  window.addEventListener('resize', measureDistanceToBottom);

}
//#endregion fill dropdown     


//#region  update function
document.querySelector('#btn_update').addEventListener('click', async function () {

        // استعداد البيانات
        const date_input = document.querySelector('#date_input').value;
        const id_hidden_input = document.querySelector('#id_hidden_input').value;
        const dropdown_select_input = document.querySelector('#dropdown_select_input').value;
        const days_input = document.querySelector('#days_input').value.trim();
        const hours_inpu = document.querySelector('#hours_inpu').value.trim();
        const values_input = document.querySelector('#values_input').value.trim();
        const note_inpute = document.querySelector('#note_inpute').value.trim();
        // const btn_save = document.querySelector('#btn_save');
        const today = new Date().toISOString().split('T')[0]; // date in format (yyyy-mm-dd)

  await fetchDelete1(
    {  attendance_id,
      id_hidden_input,
      date_input,
      days_input,
      hours_inpu,
      values_input,
      note_inpute,
      today,},
      'attendance_permission',
      'هل تريد تحديث بيانات المؤثر',
      10,
      '/attendance_update',
      true,
      'attendance_ar'
  );

  });
  

  //#region  delete function
  document.querySelector('#btn_delete').addEventListener('click', async function () {

    await fetchDelete1(
      {attendance_id},
      'attendance_permission',
      'هل تريد حذف المؤثر ؟',
      10,
      '/attendance_delete',
      true,
      'attendance_ar'
    );

});   
  //#endregion end - delete function
 




//#endregion End- Functions

    
    document.addEventListener('DOMContentLoaded', async function () {
        await get_attendance_data_fn();
        checkValueAndSetColor('days_input');
        checkValueAndSetColor('hours_inpu');
        checkValueAndSetColor('values_input');
    });




