
let is_column_Note_show = 'none'
let is_column_discount_show = 'none'

const is_RowNote_checkBox = document.querySelector(`#is_RowNote_checkBox`)
const is_RowDiscount_checkBox = document.querySelector(`#is_RowDiscount_checkBox`)

is_RowNote_checkBox.onchange = function(){
  const x = is_RowNote_checkBox.checked
    tableColumn_hidden_and_show(x,'myTable','Xnote')
    is_column_Note_show = x
}

is_RowDiscount_checkBox.onchange = function(){
  const x = is_RowDiscount_checkBox.checked
    tableColumn_hidden_and_show(x,'myTable','Xdsicount')
    is_column_discount_show = x
}

function build_table(){

    table.querySelector('thead').innerHTML  = `
                  <tr>
                    <th style="width: auto;"></th>
                    <th style="width: auto;">#</th>
                    <th style="width: auto;">النوع</th>
                    <th style="width: 100%;">الصنف</th>
                    <th style="display: ${is_column_Note_show}; width: auto;" class="Xnote">البيان</th>
                    <th style="width: auto;">الكميه</th>
                    <th style="width: auto;">السعر</th>
                    <th style="display: ${is_column_discount_show}; width: auto;" class="Xdsicount">الخصم</th>
                    <th style="width: auto;">الاجمالى</th>
                    <th style="width: auto;">الضريبة</th>
                    <th style="width: auto;">مبلغ الضريبه</th>
                    <th style="width: auto; text-align: center;">الاجمالى</th>
                    <th style="width: auto;"></th>
                  </tr>
                
                `;
                
  table.querySelector('tfoot').innerHTML  = ` 

  <tr>
      <td id="lengthColumn1"></td>
      <td id=""></td>
      <td id=""></td>
      <td id=""style="width:100%; padding-inline-start: 2.5rem; font-weight: bold; opacity: 0.8;"></td>
      <td id=""style="display: ${is_column_Note_show}; padding-inline-start: 2.5rem; font-weight: bold; opacity: 0.8;" class="Xnote"></td>
      <td id="" style="text-align: center"></td>
      <td id=""></td>
      <td id="" style="display: ${is_column_discount_show};" class="Xdsicount"></td>

      <td id="" colspan="3">
        <div class="tfoot_totalDiv_note">
             <!-- يتم ملء أسماء الضرائب هنا ديناميكيًا -->
        </div>
      </td>
      <td id="">
        <div class="tfoot_totalDiv_Values">
           <!-- يتم ملء أسماء الضرائب هنا ديناميكيًا -->
        </div>
      </td>
      <td id=""></td>
  </tr>

  <tr>
    <td colspan="13" class="">
      <div class="row x_start y_center w_full h_full" style="gap: 0.5rem; ">
        <button id="btn_newRow" class="btn_new" onclick="addRow(accountsDataArray, salesAndLocationsData.taxHeaderArray)">سطر جديد</button>
        <select id="columnSelect" class="select m_0" style="width: fit-content; height: 3.5rem;">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
      </div>
    </td>
  
    <td id="difference_debet_cerdit" colspan="2" class="" style="text-align: center; opacity: 0.5; color: var(--Font_Color); transition: var(--transition);"></td>
  
    <td></td>
    <td></td>
  
  </tr>
  
  `;
  
  }
  
  
  
  
  function addRow(dataArray, taxHeaderArray) { //! mtnsash te3del el addRow beta3 el zeror ely fe el table fe ele Buld_table()
    
    
    const DropDown_accounts_tableColumnsName = ['id', 'account_name', 'item_unite'];
    const DropDown_TaxHeader_tableColumnsName = ['id', 'taxe_package_name'];
    
    var numRows = parseInt(document.getElementById("columnSelect").value);
    
    const str_uniqVar = 'str_uniqVar1'
    // إضافة صف جديد فارغ في نهاية الجدول
    for (var i = 0; i < numRows; i++) {
      var emptyRow = document.createElement("tr");
      emptyRow.classList.add(`mainTr`)
      emptyRow.innerHTML = `
                  <td style="width: auto;" class="">
                    <div class="dragbutton_table">
                      <button class="drag-handle">
                        <i class="fa-solid fa-arrows-up-down" style=" pointer-events: none;"></i>
                      </button>
                    </div>
                  </td>

                  <td class="span_Total_In_Table rowCount" style="min-width:fit-content"></td>
                  <td>
                      <select name="" id="" class="account_type select h_full" onchange="change_select_account_type(this)">
                         <option value="5">صنف</option>
                         <option value="8">خدمة</option>
                      </select>
                  </td>
                    
                  
                  <td style="width: 100%; height: var(--input_height);">
                  <!-- dropdown -->
                    <div class="dropdown_container_input_table" id="">
                      <div class="row h_full">
                        <span class="input_span_start account_type_name T">صنف</span>
                        <div class="dropdown_select_input_table" id=""  onclick="tableDropdownList(this, '${encodeURIComponent(JSON.stringify(dataArray))}', '${encodeURIComponent(JSON.stringify(DropDown_accounts_tableColumnsName))}', 'account_type', 'tbody_itemUniteName')"  style="min-width: 10rem;">
                          <div id="" class="dropdown_select_input T hover"></div>
                          <i class="fa-solid fa-caret-down left_icon"></i>
                          <i class="fa-solid fa-xmark clear_icon" style="display: none;" onclick="clear_icon1(event)"></i>
                          <input type="hidden" class="id_hidden_input x1 T" id="" readonly>
                        </div>

                    </div>
                      <div class="dropdown_menue hover scroll" id="" style="display: none;">
                        <div class="dropdown_search">
                          <input type="search" class="dropdown_search_input hover" id="" placeholder="ابحث هنا..."
                            oninput="tableDropdownList_performSearch(this)" autocomplete="off">
                        </div>
                        <div class="inputTable_dropdown_tableContainer" id="">
                          <!-- قائمة الخيارات تظهر هنا -->
                        </div>
                      </div>
                    </div>
                  <!-- END dropdown -->
                  </td>
  
                  
                  <td style="display: ${is_column_Note_show}; width: auto;" class="inputTable_noteTd hover Xnote" contenteditable="true" onkeydown="td_EnterkeypressEvent1(event)"></td>
                  
                  <td style="width: auto;">
                        <div class="row h_full">
                          <div class="div_input_sm  hover scroll Xitem_amount T" contenteditable="true" oninput="check_parse(this,'number'),update_table('myTable')" onkeydown="td_EnterkeypressEvent1(event)"></div>
                          <span class="input_span_end tbody_itemUniteName">الكمية</span>
                          </div>
                  </td>

                  <td style="width: auto;" class="div_input_sm UnitePrice hover" oninput="check_parse(this,'number'),update_table('myTable')" contenteditable="true"></td>
                  
                  <td style="display: ${is_column_discount_show}; width: auto;" class="Xdsicount">
                        <div class="row h_full">
                        <select class="span_Total_In_Table tbody_discountType" onchange="update_table('myTable')">
                          <option value="1">نسبه %</option>
                          <option value="2">مبلغ</option>
                        </select>
                          <div class="div_input_sm  hover scroll tbody_discountValue Xrow_discount_value T" contenteditable="true" oninput="check_parse(this,'number'),update_table('myTable')" onkeydown="td_EnterkeypressEvent1(event)"></div>
                        </div>
                  </td>
                  
                  <td style="width: auto; margin: 0" class="span_Total_In_Table tbody_totalBeforTax"></td>
                  
                  <td style="width: auto;">
                  <!-- dropdown -->
                    <div class="dropdown_container_input_table taxHeaderDiv" id="">
                      <div class="row h_full">
                        <div class="dropdown_select_input_table" id=""  onclick="tableDropdownList(this, '${encodeURIComponent(JSON.stringify(taxHeaderArray))}', '${encodeURIComponent(JSON.stringify(DropDown_TaxHeader_tableColumnsName))}', false, false)"  style="min-width: 10rem;">
                          <div id="" class="dropdown_select_input taxHeaderInput T hover" oninput="update_table('myTable')"></div>
                          <i class="fa-solid fa-caret-down left_icon"></i>
                          <i class="fa-solid fa-xmark clear_icon" style="display: none;" onclick="clear_icon1(event)"></i>
                          <input type="hidden" class="id_hidden_input tbody_taxType x1 T" id="" readonly>
                        </div>

                    </div>
                      <div class="dropdown_menue hover scroll" id="" style="display: none;">
                        <div class="dropdown_search">
                          <input type="search" class="dropdown_search_input hover" id="" placeholder="ابحث هنا..."
                            oninput="tableDropdownList_performSearch(this)" autocomplete="off">
                        </div>
                        <div class="inputTable_dropdown_tableContainer" id="">
                          <!-- قائمة الخيارات تظهر هنا -->
                        </div>
                      </div>
                    </div>
                  <!-- END dropdown -->
                  </td>

                  <td style="width: auto; margin: 0" class="span_Total_In_Table tbody_taxValue"></td>

                  <td style="width: auto; margin: 0" class="span_Total_In_Table totalAfterTax"></td>
  
  
                  <td style="width: auto;" class="">
                    <div class="table_buttons_div">
                      <button onclick="deleteRow(this)" title="حذف الصف"><i class="fa-solid fa-xmark"></i></button>
                      <button onclick="copyRow(this)" title="نسخ الصف"><i class="fa-regular fa-copy"></i></button>
                    </div>
                  </td>
  `;
      table.querySelector('tbody').appendChild(emptyRow);
  
      const taxHeaderInput = emptyRow.querySelector('.taxHeaderInput');
      if (taxHeaderInput) {
        const observer = new MutationObserver(() => {
          // تحديث الجدول عند حدوث تغير
          update_table('myTable');
          
        });
  
        observer.observe(taxHeaderInput, {
          childList: true, // مراقبة تغييرات العناصر
          characterData: false, // مراقبة النصوص
          subtree: false // مراقبة العناصر الفرعية
        });
      }
    }
    reset_rowcount_in_table(`myTable`)
  }
  
  function td_EnterkeypressEvent1(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // يمنع السطر الجديد
    }
}
  
  function deleteRow(btn) {
    try {
    const rows_length = parseInt(btn.closest("tbody").rows.length) || 0;
    if (rows_length <= 1) {
      showAlert('info', 'لايمكن حذف هذا الصف ,يمكنك حذف العمليه بالكامل بدلا من ذلك')
      return;
    }
    const row = btn.closest("tr");
    row.remove();
    reset_rowcount_in_table(`myTable`)
    update_table('myTable')
    

    } catch (error) {
      catch_error
    }
  }
  
  function copyRow(btn) {
    try {

    const row = btn.closest("tr");
    const newRow = row.cloneNode(true);

    // const tbody_taxType_select_value = row.querySelector(`.tbody_taxType`).value
    // newRow.querySelector(`.tbody_taxType`).value = tbody_taxType_select_value

    row.parentNode.insertBefore(newRow, row.nextSibling);
    
 
    
    reset_rowcount_in_table(`myTable`)
    update_table('myTable')
          
  } catch (error) {
    catch_error
  }
  }

  

 function tableColumn_hidden_and_show(is_hide_or_show,str_tableId,str_className){
  const cells = document.querySelectorAll(`#${str_tableId} .${str_className}`)
  if (is_hide_or_show){
    for (const cell of cells){
      cell.style.display = 'table-cell'
    }
  }else{
    for (const cell of cells){
    cell.style.display = 'none'
  }
  }
 }



function update_table(str_tableName){
  try {

  const table = document.getElementById(`${str_tableName}`);
  const rows = table.querySelectorAll(`.mainTr`);

  
  let totalsArray = []
  let totalTaxValue = 0

  const tfoot_totalDiv_note = table.querySelector(`.tfoot_totalDiv_note`); tfoot_totalDiv_note.innerHTML = ""
  const tfoot_totalDiv_Values = table.querySelector(`.tfoot_totalDiv_Values`); tfoot_totalDiv_Values.innerHTML = ""

  function update_totalsArray (tax_account_id,str_name,val){
    if (tax_account_id){
      const obj = totalsArray.find(obj => obj.tax_account_id === tax_account_id)
      if (obj){
        obj.val = +obj.val + val;
      }else{
        totalsArray.push({tax_account_id:tax_account_id, name: str_name , val:+val})
      }
    }else{
      const obj = totalsArray.find(obj => obj.name === str_name)
      if (obj){
        obj.val = +obj.val + val;
      }else{
        totalsArray.push({name: str_name , val:+val})
      }
    }
  }



  for (const row of rows){
    
    const amount = +row.querySelector(`.Xitem_amount`).textContent || 0;
    const UnitePrice = +row.querySelector(`.UnitePrice`).textContent || 0;
    const tbody_discountType = +row.querySelector(`.tbody_discountType`).value || 0;
    const discountValueElement = +row.querySelector(`.Xrow_discount_value`).textContent || 0;
    const tbody_totalBeforTax = row.querySelector(`.tbody_totalBeforTax`);
    const tbody_taxValue = row.querySelector(`.tbody_taxValue`);
    const totalAfterTax = row.querySelector(`.totalAfterTax`);


    const Xrow_discount_value =
      tbody_discountType === 1
        ? +((discountValueElement / 100) * (amount * UnitePrice)).toFixed(2)
        : +discountValueElement.toFixed(2);
        const Val_beforTax = +((amount * UnitePrice) - Xrow_discount_value).toFixed(2);
        tbody_totalBeforTax.textContent = Val_beforTax.toFixed(2)
        
        update_totalsArray(false,'الاجمالى',Val_beforTax)

        let Val_rowTax = 0;
        const taxType = +row.querySelector(`.tbody_taxType`).value || 0;
      
        if (taxType !== 0) {
          for (const taxRow of salesAndLocationsData.taxBodyArray) {
            if (+taxRow.settings_tax_header_id === taxType) {
              const taxAccount_id = +taxRow.tax_account_id;
              // const taxAccount_name = taxRow.account_name.trim();
              const tax_name = taxRow.tax_name.trim();
              const taxRate = +taxRow.tax_rate / 100;
              const taxMultiplier = taxRow.is_tax_reverse ? -1 : 1;
              const taxValue = +(Val_beforTax * taxRate * taxMultiplier).toFixed(2);
              Val_rowTax += taxValue;
              totalTaxValue += taxValue
              update_totalsArray(taxAccount_id,tax_name,taxValue)
            }
          }
          tbody_taxValue.textContent = Val_rowTax.toFixed(2)
        }else{
          tbody_taxValue.textContent = 0.00
        }
    
        totalAfterTax.textContent =  (Val_beforTax + Val_rowTax).toFixed(2)
  }

  totalsArray.forEach((obj, index) => {

    tfoot_totalDiv_note.innerHTML += `<span style="${index === 0 ? 'font-weight: bold;' : ''}">${obj.name}</span>`
    tfoot_totalDiv_Values.innerHTML += `<span style="${index === 0 ? 'font-weight: bold;' : ''}" class="${obj.val < 0? 'color_negative' : ''}">${obj.val}</span>`
  })
  if (totalsArray.length > 1){
    tfoot_totalDiv_note.innerHTML += `<span style="font-weight: bold;font-size:1.6rem;">الاجمالى</span>`
    tfoot_totalDiv_Values.innerHTML += `<span style="font-weight: bold; font-size:1.6rem">${totalsArray[0].val + totalTaxValue}</span>`
  }
    
} catch (error) {
  catch_error(error)
}
}




function handle_input_event(input) {
    const currentRow = input.closest("tr");
    const cellIndex = input.closest("td").cellIndex;
    if (cellIndex === 4) {          
      currentRow.cells[5].textContent = "";
    } else if (cellIndex === 5) {
      currentRow.cells[4].textContent = "";
    }
    check_parse(input, 'number');
    updateFooter()
  }
  
  
// تحديد الخيار المختار وإخفاء القائمة


function change_select_account_type(select) {
  const tr = select.closest("tr");

  const inputes = tr.querySelectorAll('.T');
  for (const input of inputes) {
    input.textContent = "";
  }

  // tr.querySelector(`.items_div`).style.display = 'none'
  const span = tr.querySelector(`.account_type_name`)
  const val = parseInt(select.value)
  if (val === 5) {
    span.textContent = "صنف"
  } else if (val === 8) {
    span.textContent = "خدمة"
  }
}


//#region accounts Data in dropdown select


// تحضير البيانات من السيرفر
async function getAccounsData_fn() {

  const  data = await new_fetchData_postAndGet(
    "/getItemssData1",
    {},
    'sales_permission', 'view',
    15,
    false,false,
    true,
    false,false,
    false,false,
    false,false,false,
    true,"sales_view_ar",
    "An error occurred (Code: TAA1). Please check your internet connection and try again; if the issue persists, contact the administrators."
  )
return data



};













//#endregion


//#region get salesman and itemsLocations
async function get_salesmanAndItemslocations_fn() {

  data_accounts = await new_fetchData_postAndGet(
    "/get_itemsLocation_And_salesman",
    {},
    'sales_permission', 'view',
    15,
    false,false,
    true,
    false,false,
    false,false,
    false,false,false,
    true,"sales_view_ar",
    "An error occurred (Code: TAA1). Please check your internet connection and try again; if the issue persists, contact the administrators."
  )
return data_accounts
};
//#endregion