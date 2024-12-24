


let Data = [];
let itemslocationsArray = [];
// let salesmanArray = [];
let taxHeaderArray = [];
let settings_tax_header_id_Array = [];
let taxBodyArray = [];
let itemsDataArray = [];
let vendorsDataArray = [];
let headerDataArray = [];
let bodyDataArray = [];


const qutation_reference_div = document.querySelector(`.qutation_reference_div`)
const order_reference_div = document.querySelector(`.order_reference_div`)

let is_column_Note_show = 'none'
let is_column_discount_show = 'none'

const is_RowNote_checkBox = document.querySelector(`#is_RowNote_checkBox`)
const is_RowDiscount_checkBox = document.querySelector(`#is_RowDiscount_checkBox`)

is_RowNote_checkBox.onchange = function(){
  const x = is_RowNote_checkBox.checked
    tableColumn_hidden_and_show(x,'myTable','td-inputTable_noteTd')
    is_column_Note_show = x
}

is_RowDiscount_checkBox.onchange = function(){
  const x = is_RowDiscount_checkBox.checked
    tableColumn_hidden_and_show(x,'myTable','td-dsicount')
    is_column_discount_show = x
}

function build_table(){

    table.querySelector('thead').innerHTML  = `
                  <tr>
                    <th style="width: auto;" class="notViewTd"></th>
                    <th style="width: auto;">#</th>
                    <th style="width: auto;">النوع</th>
                    <th style="width: 100%;">الصنف</th>
                    <th style="display: ${is_column_Note_show}; width: auto;" class="td-inputTable_noteTd">البيان</th>
                    <th style="width: auto;">الكميه</th>
                    <th style="width: auto;">السعر</th>
                    <th style="display: ${is_column_discount_show}; width: auto;" class="td-dsicount">الخصم</th>
                    <th style="width: auto;">الاجمالى</th>
                    <th style="width: auto;">الضريبة</th>
                    <th style="width: auto;">مبلغ الضريبه</th>
                    <th style="width: auto; text-align: center;">الاجمالى</th>
                    <th style="width: auto;" class="notViewTd"></th>
                  </tr>
                
                `;
                
  table.querySelector('tfoot').innerHTML  = ` 

  <tr>
      <td id="lengthColumn1" class="notViewTd"></td>
      <td id=""></td>
      <td id=""></td>
      <td id=""style="width:100%; padding-inline-start: 2.5rem; font-weight: bold; opacity: 0.8;"></td>
      <td id=""style="display: ${is_column_Note_show}; padding-inline-start: 2.5rem; font-weight: bold; opacity: 0.8;" class="td-inputTable_noteTd"></td>
      <td id="" style="text-align: center"></td>
      <td id=""></td>
      <td id="" style="display: ${is_column_discount_show};" class="td-dsicount"></td>

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
      <td id="" class="notViewTd"></td>
  </tr>

  <tr>
    <td colspan="13" class="notViewTd">
      <div class="row x_start y_center w_full h_full" style="gap: 0.5rem; ">
        <button id="btn_newRow" class="btn_new" onclick="addRow(itemsDataArray, taxHeaderArray)">سطر جديد</button>
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
                  <td style="width: auto;" class="td-drag-handle notViewTd">
                    <div class="dragbutton_table">
                      <button class="drag-handle">
                        <i class="fa-solid fa-arrows-up-down" style=" pointer-events: none;"></i>
                      </button>
                    </div>
                  </td>

                  <td class="span_Total_In_Table rowCount td-account_type" style="min-width:fit-content"></td>
                  <td class="td-item_type">
                      <select name="" id="" class="account_type select h_full" onchange="change_select_account_type(this)">
                         <option value="5">صنف</option>
                         <option value="8">خدمة</option>
                      </select>
                  </td>
                    
                  
                  <td style="width: 100%; height: var(--input_height);" class="td-itemId">
                  <!-- dropdown -->
                    <div class="dropdown_container_input_table" id="">
                      <div class="row h_full">
                        <span class="input_span_start account_type_name T">صنف</span>
                        <div class="dropdown_select_input_table" id=""  onclick="tableDropdownList(this, '${encodeURIComponent(JSON.stringify(dataArray))}', '${encodeURIComponent(JSON.stringify(DropDown_accounts_tableColumnsName))}', 'account_type', 'tbody_itemUniteName')"  style="min-width: 10rem;">
                          <div id="" class="dropdown_select_input T hover"></div>
                          <i class="fa-solid fa-caret-down left_icon"></i>
                          <i class="fa-solid fa-xmark clear_icon" style="display: none;" onclick="clear_icon_on_table_td(event),reset_row_unit(event)"></i>
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
  
                  
                  <td style="display: ${is_column_Note_show}; width: auto;" class="td-inputTable_noteTd inputTable_noteTd T hover" contenteditable="true" onkeydown="td_EnterkeypressEvent1(event)"></td>
                  
                  <td style="width: auto;" class="td-amount">
                        <div class="row h_full">
                          <div class="div_input_sm  hover scroll Xitem_amount T" contenteditable="true" oninput="check_parse(this,'number'),update_table('myTable')" onkeydown="td_EnterkeypressEvent1(event)"></div>
                          <span class="input_span_end tbody_itemUniteName">الكمية</span>
                          </div>
                  </td>

                  <td style="width: auto;" class="div_input_sm td-unitePrice T hover" oninput="check_parse(this,'number'),update_table('myTable')" contenteditable="true"></td>
                  
                  <td style="display: ${is_column_discount_show}; width: auto;" class="td-dsicount">
                        <div class="row h_full">
                        <select class="span_Total_In_Table tbody_discountType" onchange="update_table('myTable')">
                          <option value="1">نسبه %</option>
                          <option value="2">مبلغ</option>
                        </select>
                          <div class="div_input_sm  hover scroll tbody_discountValue Xrow_discount_value T" contenteditable="true" oninput="check_parse(this,'number'),update_table('myTable')" onkeydown="td_EnterkeypressEvent1(event)"></div>
                        </div>
                  </td>
                  
                  <td style="width: auto; margin: 0" class="span_Total_In_Table td-totalBeforTax"></td>
                  
                  <td style="width: auto;" class="td-taxHeader">
                    <!-- dropdown -->
                    <div class="dropdown_container_input_table taxHeaderDiv" id="">
                      <div class="row h_full">
                        <div class="dropdown_select_input_table" id=""  onclick="tableDropdownList(this, '${encodeURIComponent(JSON.stringify(taxHeaderArray))}', '${encodeURIComponent(JSON.stringify(DropDown_TaxHeader_tableColumnsName))}', false, false)"  style="min-width: 10rem;">
                          <div id="" class="dropdown_select_input taxHeaderInput T hover" oninput="update_table('myTable')"></div>
                          <i class="fa-solid fa-caret-down left_icon"></i>
                          <i class="fa-solid fa-xmark clear_icon" style="display: none;" onclick="clear_icon_on_table_td(event),reset_row_unit(event)"></i>
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

                  <td style="width: auto; margin: 0" class="span_Total_In_Table td-taxValue"></td>

                  <td style="width: auto; margin: 0" class="span_Total_In_Table td-totalAfterTax"></td>
  
  
                  <td style="width: auto;" class="td-lastTd notViewTd">
                    <div class="table_buttons_div">
                      <button onclick="deleteRow(this)" title="حذف الصف"><i class="fa-solid fa-xmark"></i></button>
                      <button onclick="copyRow(this)" title="نسخ الصف"><i class="fa-regular fa-copy"></i></button>
                    </div>
                  </td>
  `;
      table.querySelector('tbody').appendChild(emptyRow);
  
      observe_changes_in_taxheaderinput(emptyRow)
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
    // التحقق إذا كان العنصر input أو textarea
    if (input.tagName === 'INPUT' || input.tagName === 'TEXTAREA') {
      input.value = ""; // استخدام value لهذه العناصر
    } else {
      input.textContent = ""; // استخدام textContent للعناصر الأخرى
    }
  }

  const clear_icons = tr.querySelectorAll('.clear_icon'); // row.id
  clear_icons.forEach(element => {
    element.style.display = 'none'
  });

  // tr.querySelector(`.items_div`).style.display = 'none'
  const span = tr.querySelector(`.account_type_name`)
  const val = parseInt(select.value)
  if (val === 5) {
    span.textContent = "صنف"
  } else if (val === 8) {
    span.textContent = "خدمة"
  }
 
  update_table('myTable')
}


function reset_row_unit(event){
  try {
    event.stopPropagation(); // منع انتقال الحدث إلى العنصر الأب
    const clickedIcon = event.target;
    const mainRow = clickedIcon.closest(`.mainTr`)    
    const unit = mainRow.querySelector(`.td-amount .tbody_itemUniteName`).textContent = 'الكميه' 
  } catch (error) {
    catch_error(error)
  }
}

//#region get salesman and itemsLocations



//#endregion

function observe_changes_in_taxheaderinput(row){
  const taxHeaderInput = row.querySelector('.td-taxHeader .taxHeaderInput');
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