

setActiveSidebar('attendance_ar');
//#region showReason of redirection
//! الكود دا خاص بملف ال روووتس  هو الى من خلاله بجيب القيم بتاع  سويتش كيس

document.addEventListener('DOMContentLoaded', function () {
    showRedirectionReason();
});

//#endregion End - showReason of redirection

//#region table

// إعلان المتغير على مستوى الـ script  
const tableContainer = document.getElementById('table-container');
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');



//#region  ( baynat el employees mn el database )
// get data from db and store it in array1
let data = [];
let array1 = [];
let slice_Array1 = [];


async function getEmployeesData_fn() {
    const response = await fetch('/get_All_attendance_Data');
    data = await response.json();

    // تحديث array1 بنتيجة الـ slice
    array1 = data.slice();

}

async function showFirst50RowAtTheBegening() {
    await getEmployeesData_fn()
    slice_Array1 = array1.slice(0, 50); // انشاء مصفوفه جديده تحتوى على اول 50 سطر من البيانات فقط
    fillAttendancetable()
}

document.addEventListener("DOMContentLoaded", function () {
    // استدعاء الدالة عندما تكتمل تحميل الصفحة
    showFirst50RowAtTheBegening();
});

async function fillAttendancetable() {
    //  @@ هاااااام جدا 
    // el properties beta3 kol 3amod ytm wad3ha fe el <thead></thead> And <tbody></tbody> And <tfoor></tfoor> kol wa7ed lewa7do
    // el properties hya :
    // 1 : display: none; > fe 7alt enak ardt e5fa2 el 3amod -- display: ; hatspha fadya fe7alt enak ardt tezhr el 3amod
    // 2 : white-space: nowrap;  fe 7alt enak ardt en el text maylfsh ta7t ba3do  -- white-space: wrap; fe 7alt enak ardt en el tezt ylf
    // 3 : width: auto;  fe 7alt enak ardt en ykon 3ard el 3amod 3ala ad el mo7tawa -- width: 100%; fe 7alt enak ardt en el 3amod ya5od ba2y el mesa7a el fadla
    // 4 : text-align: center / left / right / justify   da 3ashan tet7km fe el text ymen wala shemal wala fe ele nos

       //* Prepare GLOBAL variables Befor sum functions
       total_column1.value = 0
       total_column2.value = 0
       total_column3.value = 0

    // إعداد رأس الجدول
    let tableHTML = `<table id="employees_table" class="review_table">
                        <thead>
                            <tr>
                                <th></th>
                                <th style="display: none;">id</th>
                                <th style="display: none;">employee_id</th>
                                <th>التاريخ</th>
                                <th>اليوم</th>
                                <th>الموظف</th>
                                <th>يوم</th>
                                <th>ساعة</th>
                                <th>قيمة</th>
                                <th>البيان</th>
                            </tr>
                            </thead>
                            <tbody>`;

    // إضافة صفوف الجدول بناءً على البيانات
    // slice_Array1 = ""; // تفريغ المصفوفه
    slice_Array1.forEach(row => {
        tableHTML += `<tr>
                            <td> <button class="tabble_update_btn" onclick="tabble_update_btn_fn(this)">تحرير</button> </td>
                            <td style="display: none;">${row.id}</td>
                            <td style="display: none;">${row.employee_id}</td>
                            <td style="width: auto; white-space: nowrap;">${row.datex}</td>
                            <td style="width: auto; white-space: nowrap;">${day_name(row.datex)}</td>
                            <td style="width: auto; white-space: nowrap;">${row.employee_name}</td>
                            <td style="width: auto; white-space: nowrap;" class="table_number">${total_column(total_column1,row.days)}</td>
                            <td style="width: auto; white-space: nowrap;" class="table_number">${total_column(total_column2,row.hours)}</td>
                            <td style="width: auto; white-space: nowrap;" class="table_number">${total_column(total_column3,row.values)}</td>
                            <td style="min-width: 20rem; width: 100%; white-space: wrap;">${row.note}</td>
                          </tr>`;
    });

    tableHTML += `</tbody>
        <tfoot> 
            <tr class="table_totals_row";>
                <td id="tfooter1"></td>
                <td id="tfooter2" style="display: none;"></td>
                <td id="tfooter3" style="display: none;"></td>
                <td id="tfooter4"></td>
                <td id="tfooter5"></td>
                <td id="tfooter6"></td>
                <td id="tfooter7"></td>
                <td id="tfooter8"></td>
                <td id="tfooter9"></td>
                <td id="tfooter10"></td>
            </tr>

            <tr id="table_fotter_buttons_row">
                <td colspan="10">  <!-- da awel 3amod fe ele sad tr han7othan5elh han3mel merge lkol el columns fe column wa7ed 3ashan n7ot el 2 buttons hat3mel colspan le3add el 3awamed kolaha -->
                    <div class='flex_H'>
                        <button class="table_footer_btn"  id="" onclick="ShowAllDataInAttendanceTable()">All</button>
                        <button class="table_footer_btn"  id="" onclick="showFirst50RowInAttendanceTable()">50</button>
                    </div>
                </td>
            </tr>

        </tfoot>`;

    // إغلاق الجدول
    tableHTML += '</table>';

    // تحديث محتوى الصفحة بناءً على البيانات
    tableContainer.innerHTML = await tableHTML;
    //  عمليات صف الاجمالى 
    // جمع القيم في العمود رقم 6



    if (array1.length > 0 && array1.length <= 50) {
        document.querySelector('#table_fotter_buttons_row').style.display = "none";
    } else if (array1.length < 1) {
        document.querySelector('#table_fotter_buttons_row').innerHTML = `<td colspan='10' class="td_no_result">لا نتائج</td>`;
    };

    document.getElementById("tfooter1").textContent = slice_Array1.length; // عدد الصفوف
    document.getElementById("tfooter7").textContent = total_column1.value;
    document.getElementById("tfooter8").textContent = total_column2.value;
    document.getElementById("tfooter9").textContent = total_column3.value;

};


// search in attendanceTable
async function performSearch() {
    // الحصول على قيمة البحث
    const searchValue = searchInput.value.trim().toLowerCase();

    // فلترة البيانات بناءً على قيمة البحث
    array1 = data.filter(row => {
        // التحقق من أن employee.id و employee.name ليستان فارغتين

        const nameMatch = row.employee_name && row.employee_name.toString().toLowerCase().includes(searchValue);
        const dateMatch = row.datex && row.datex.toString().toLowerCase().includes(searchValue);
        const noteMatch = row.note && row.note.toString().toLowerCase().includes(searchValue);
        const daysMatch = row.days && row.days.toString().toLowerCase().includes(searchValue);
        const hoursMatch = row.note && row.note.toString().toLowerCase().includes(searchValue);
        const valuesMatch = row.note && row.note.toString().toLowerCase().includes(searchValue);
        return dateMatch || nameMatch || noteMatch || daysMatch || hoursMatch || valuesMatch;
    });

    slice_Array1 = array1.slice(0, 50); // انشاء مصفوفه جديده تحتوى على اول 50 سطر من البيانات فقط
    fillAttendancetable()
}

async function ShowAllDataInAttendanceTable() {
    showAlert('info', 'ان ظهار كامل البيانات فى القائمة المنسدله لا يؤثر على عمليه البحث فى البيانات')
    slice_Array1 = array1.slice(); // انشاء مصفوفه جديده تحتوى على اول 50 سطر من البيانات فقط
    fillAttendancetable()
}

async function showFirst50RowInAttendanceTable() {
    slice_Array1 = array1.slice(0, 50); // انشاء مصفوفه جديده تحتوى على اول 50 سطر من البيانات فقط
    fillAttendancetable()
}


// عند الضغط على زر البحث
searchBtn.addEventListener('click', performSearch);

// حدث عن الضغط على زر المسح الخاص ب الانبوت سيرش الى بيظهر لما بنكتب بيانات
searchInput.addEventListener('search', function () {
    performSearch();
});


// عند الضغط على زرار انتر وانت واقف فى مربع البحث
searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        performSearch();
    };
});


async function tabble_update_btn_fn(updateBtn) {
    // const permission = await btn_permission('employees_permission','update');

    // if (!permission){ // if false
    //     return;
    // };
    // عثر على الموظف باستخدام معرف الموظف
    console.log(`start`);
    const row  = updateBtn.closest("tr")

    const attendance_data = {
        attendance_id : row.cells[1].textContent
      }

        sessionStorage.setItem('attendance_data',JSON.stringify(attendance_data))
        window.location.href = '/attendance_update_ar';

};

//#endregion end - table



