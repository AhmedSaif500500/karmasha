setActiveSidebar('production_view_ar');
//check permissions
pagePermission('view', 'production_permission');


// إعلان المتغير على مستوى الـ script

const tableContainer = document.getElementById('tableContainer');
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');



//#region  ( baynat el employees mn el database )
// get data from db and store it in array1
let data = [];
let array1 = [];
let slice_Array1 = [];


async function geteProductionData_fn() {
    data = await fetchData_postAndGet(
        '/get_All_production_Data',
        {},
        'production_permission','view',
        15,
        false,'',
        false,
        true,content_space,
        false,'',
        'حدث خطأ اثناء معالجة البيانات'
    )

    array1 = data.slice();
    
}

async function showFirst50RowAtTheBegening() {
    await geteProductionData_fn()
    slice_Array1 = array1.slice(0, 50); // انشاء مصفوفه جديده تحتوى على اول 50 سطر من البيانات فقط
    filleffectstable()
}

document.addEventListener("DOMContentLoaded", function () {
    // استدعاء الدالة عندما تكتمل تحميل الصفحة
    showFirst50RowAtTheBegening();
});

function filleffectstable() {
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

        // إعداد رأس الجدول
        let tableHTML = `<table id="production_table" class="review_table">
                        <thead>
                            <tr>
                                <th></th>
                                <th style="display: none;" >ID</th>
                                <th style="widrh: auto; white-space: nowrap; text-align: center;">التاريخ</th>
                                <th style="width: 100%">البيان</th>
                                <th style="width: auto; white-space: nowrap; text-align: center;">انتاج</th>
                                <th style="width: auto; white-space: nowrap;text-align: center;">صرف</th>
                                <th style="width: 100%; white-space: nowrap; font-weight: bold;text-align: center;">جرد</th> 
                            </tr>
                            </thead>
                            <tbody>`;

        // إضافة صفوف الجدول بناءً على البيانات
        // slice_Array1 = ""; // تفريغ المصفوفه
        slice_Array1.forEach(row => {
            
            tableHTML += `<tr>
                            <td> <button class="table_update_btn" onclick="table_update_btn_fn(this)">تحرير</button> </td>
                            <td style="display: none">${row.id}</td>
                            <td style="widrh: auto; white-space: nowrap;text-align: center;">${row.datex}</td>
                            <td style="min-width: 20rem; width: 100%; white-space: wrap">${row.note}</td>
                            <td style="width: auto; white-space: nowrap;text-align: center;" class="table_number">${total_column(total_column1,row.procution_amount)}</td>
                            <td style="width: auto; white-space: nowrap;text-align: center;" class="table_number">${total_column(total_column2,row.sales_amount)}</td>
                            <td style="width: auto; white-space: nowrap; font-weight: bold;text-align: center;" class="table_number">${floatToString(true,row.cumulative_balance)}</td>
                          </tr>`;
        });

        tableHTML += `</tbody>
        <tfoot>
            <tr class="table_totals_row";>
                <td id="tfooter0" ></td>
                <td id="tfooter1" style="display: none" ></td>
                <td id="tfooter2"></td>
                <td id="tfooter3" style="width: 100%"></td>
                <td id="tfooter4" style="text-align: center;"></td>
                <td id="tfooter5" style="text-align: center;"></td>
                <td id="tfooter6" style="width: auto; font-weight: bold;text-align: center;"></td>
            </tr>
                        <tr id="table_fotter_buttons_row">
                            <td colspan="7">   <!-- da awel 3amod fe ele sad tr han7othan5elh han3mel merge lkol el columns fe column wa7ed 3ashan n7ot el 2 buttons hat3mel colspan le3add el 3awamed kolaha -->
                                <div class='flex_H'>
                                 <button class="table_footer_show_data"  id="" onclick="ShowAllDataIneffectsTable()">All</button>
                                 <button class="table_footer_show_data"  id="" onclick="showFirst50RowIneffectsTable()">50</button>
                                </div>
                            </td>
                        </tr>
                    </tfoot>`;

        // إغلاق الجدول
        tableHTML += '</table>';

        // تحديث محتوى الصفحة بناءً على البيانات
        tableContainer.innerHTML = tableHTML;
        page_content.style.display = 'flex'


// عرض نتائج الجمع
document.getElementById("tfooter0").textContent = slice_Array1.length; // عدد الصفوف
document.getElementById("tfooter4").textContent = floatToString(false,total_column1.value);
document.getElementById("tfooter5").textContent = floatToString(false,total_column2.value);




if (array1.length > 0 && array1.length <= 50) {
    document.querySelector('#table_fotter_buttons_row').style.display = "none";
} else if (array1.length < 1) {
    document.querySelector('#table_fotter_buttons_row').innerHTML = `<td colspan='7' class="td_no_result">لا نتائج</td>`;
};


};


// search in effectsTable
function performSearch() {
    // الحصول على قيمة البحث
    const searchValue = searchInput.value.trim().toLowerCase();

    // فلترة البيانات بناءً على قيمة البحث
    array1 = data.filter(row => {
        const datex = row.datex && row.datex.toString().toLowerCase().includes(searchValue);
        const note = row.note && row.note.toString().toLowerCase().includes(searchValue);
        const production_amount = row.production_amount && row.production_amount.toString().toLowerCase().includes(searchValue);
        const sales_amount = row.sales_amount && row.sales_amount.toString().toLowerCase().includes(searchValue);
        return datex || note || production_amount || sales_amount;
    });

    // تحديد جزء البيانات للعرض (أول 50 صف فقط)
    slice_Array1 = array1.slice(0, 50);

    // ملء الجدول بالبيانات
    filleffectstable();

//#region  افاء عامود ال جرد اذا كان هناك نتائج فى البحث
           
    const cumulativeBalanceColumnHeaders = document.querySelectorAll('#production_table th:nth-child(7), #production_table td:nth-child(7)');
    
    if (searchValue) {
        // إذا كانت قيمة البحث موجودة، أخفِ عمود الجرد
        cumulativeBalanceColumnHeaders.forEach(element => {
            element.style.display = 'none';
        });
    } else {
        // إذا لم تكن هناك قيمة في البحث، اعرض عمود الجرد
        cumulativeBalanceColumnHeaders.forEach(element => {
            element.style.display = 'table-cell';
        });
    }
//#endregion

}


function ShowAllDataIneffectsTable(){
    showAlert('info', 'ان ظهار كامل البيانات فى القائمة المنسدله لا يؤثر على عمليه البحث فى البيانات')
    slice_Array1 = array1.slice(); // انشاء مصفوفه جديده تحتوى على اول 50 سطر من البيانات فقط
    filleffectstable()
}

function showFirst50RowIneffectsTable(){
    slice_Array1 = array1.slice(0,50); // انشاء مصفوفه جديده تحتوى على اول 50 سطر من البيانات فقط
    filleffectstable()
}


// عند الضغط على زر البحث
searchBtn.addEventListener('click',  performSearch);

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


function table_update_btn_fn(updateBtn) {
  const row  = updateBtn.closest("tr")


  const production_data = {
     id_value : row.cells[1].textContent,
     date_value : row.cells[2].textContent,
     note_value : row.cells[3].textContent,
     procution_value :stringToFloat(false,row.cells[4].textContent) ,
     sales_value : stringToFloat(false,row.cells[5].textContent),
  }

  sessionStorage.setItem('production_update_data',JSON.stringify(production_data))
  window.location.href = 'production_update_ar';
};



//#region 

//#region showReason of redirection
//! الكود دا خاص بملف ال روووتس  هو الى من خلاله بجيب القيم بتاع  سويتش كيس

  document.addEventListener('DOMContentLoaded', function() {
    showRedirectionReason();
  });
  
  //#endregion End - showReason of redirection