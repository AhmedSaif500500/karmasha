setActiveSidebar('salesMain_view_ar');
pagePermission("add","sales_returns_permission");


const date1 = document.querySelector('#date1');
const note_inpute = document.querySelector(`#note_inpute`);
// const is_RowNote_checkBox = document.querySelector(`#is_RowNote_checkBox`); //!  already in sales_qutation_multi_pages
// const is_RowDiscount_checkBox = document.querySelector(`#is_RowDiscount_checkBox`); //!  already in sales_qutation_multi_pages
const btn_newRow = document.querySelector(`#btn_newRow`);
const table = document.querySelector(`#myTable`);


date1.value = today


async function save(A_OR_B) {

  const datex = date1.value;
  
  const customerId = document.querySelector(`#dropdown_div3_hidden_input`).value
  if (!customerId || isNaN(+customerId)) {
    showAlert(`warning`, `يرجى تحديد العميل `)
    return;
  }

  const salesmanId = document.querySelector(`#dropdown_div_hidden_input`).value
  if (!salesmanId || isNaN(+salesmanId)) {
    showAlert(`warning`, `يرجى تحديد البائع `)
    return;
  }
  

  const itemLocationId = document.querySelector(`#dropdown_div2_hidden_input`).value
  if (!itemLocationId || isNaN(+itemLocationId)) {
    showAlert(`warning`, `يرجى تحديد موقع المخزون `)
    return;
  }

  const invoiceReferenceId = document.querySelector(`#dropdown_div4_hidden_input`).value



  const general_note = note_inpute.value.trim()
  const location_name = document.querySelector(`#dropdown_div2_select_input`).value

  let total = 0
  if (!totalTaxValue || isNaN(totalTaxValue) || totalTaxValue === 0){
    total = totalVal_beforTax
  }else{
    total = totalAfterTax
  }
  

const is_RowDiscount = is_RowDiscount_checkBox.checked
const is_RowNote  = is_RowNote_checkBox.checked

  const tableRows = document.querySelectorAll('#myTable > tbody > .mainTr');



  const posted_array = []; // انشاء مصفوفه جديده اضع فيها بيانات كل صف
  if (tableRows.length > 0) { // التأكد من وجود بيانات داخل المصفوفه اولا

    let currentIndex = 1;
    for (const row of tableRows) {
      
      const item_typeId = parseInt(row.querySelector('.td-item_type .account_type').value);
      const item_id = parseInt(row.querySelector('.td-itemId .id_hidden_input').value);
      const item_name = row.querySelector('.td-itemId .dropdown_select_input').textContent;


      if (isNaN(item_id)) {
        showAlert(`warning`, `يرجى تحديد الصنف فى السطر رقم ${currentIndex}`)
        return;
      }


      const row_note = row.querySelector(`.td-inputTable_noteTd`).textContent.trim();

      const row_amount = +row.querySelector(`.td-amount .Xitem_amount`).textContent;
      if (!row_amount || isNaN(row_amount)){
        showAlert(`warning`, ` يرجى تحديد الكميه فى السطر رقم ${currentIndex}`)
        return;
      }

      const row_unitPrice = +row.querySelector(`.td-unitePrice`).textContent;
      if (!row_unitPrice || isNaN(row_unitPrice)){
        showAlert(`warning`, ` يرجى تحديد السعر فى السطر رقم ${currentIndex}`)
        return;
      }

      const row_discountTypeId = +row.querySelector(`.td-dsicount .tbody_discountType`).value;
      const row_discountValue = +row.querySelector(`.td-dsicount .tbody_discountValue`).textContent;

      

      const row_taxHeaderId = +row.querySelector('.td-taxHeader .id_hidden_input').value || "";

     

      // انشاء اوبجيكت لوضع بيانات الخلايا فيه  ثم اضافة الاوبجيكت الى عناصر المصفوفه الفارغه
      const rowData = {
        item_typeId :item_typeId,
        item_id: item_id,
        item_name: item_name,
        row_note: row_note,
        row_amount: row_amount,
        row_unitPrice: row_unitPrice,
        row_discountTypeId: row_discountTypeId,
        row_discountValue: row_discountValue,
        row_taxHeaderId: row_taxHeaderId,
      };
      posted_array.push(rowData); // اضافة الاوبجيكت الى عناصر المصفوفه
      currentIndex++; // زيادة العدّاد بعد كل تكرار
    }

    const posted_Obj = {customerId, total, datex, invoiceReferenceId, itemLocationId, salesmanId, is_RowNote, is_RowDiscount, general_note, location_name, posted_array}

    if (A_OR_B == 'B'){
      const post = await new_fetchData_postAndGet(
        "/api/sales_returns_add",
        posted_Obj,
        'sales_returns_permission', 'add',
        15,
        true,"هل تريد حفظ بيانات مرتجع المبيعات ؟",
        true,
        false,false,false,false,false,
        true,"sales_returns_add_ar",
        false,false,
         "An error occurred (Code: TAA2). Please check your internet connection and try again; if the issue persists, contact the administrators."
      )

    if (post){
      sessionStorage.removeItem('sales_returns_ViewArray') 
    }
    
    }else{
//! معلق هنا فى الصفحه كلها راجع ال permissions
    const post = await new_fetchData_postAndGet(
      "/api/sales_returns_add",
      posted_Obj,
      'sales_returns_permission', 'add',
      15,
      true,"هل تريد حفظ بيانات مرتجع المبيعات ؟",
      true,
      false,false,false,false,false,
      true,"sales_returns_view_ar",
      false,false,
       "An error occurred (Code: TAA2). Please check your internet connection and try again; if the issue persists, contact the administrators."
    )

    if (post){
      sessionStorage.removeItem('sales_returns_ViewArray')
    }
    
  }

  } else {
    showAlert('fail', 'لا توجد بيانات')
    return
  }
}

async function get_Data_for_add_page_fn() {
  // معلق
  data_accounts = await new_fetchData_postAndGet(
    "/get_data_for_sales_returns_add",
    {},
    'sales_returns_permission', 'add',
    15,
    false,false,
    true,
    false,false,
    false,false,
    false,false,false,
    true,"sales_returns_view_ar",
    "An error occurred (Code: TAA1). Please check your internet connection and try again; if the issue persists, contact the administrators."
  )
return data_accounts
};





document.addEventListener('DOMContentLoaded', async function () {
  try {

  showLoadingIcon(content_space)

  
  const convertToreturns = JSON.parse(sessionStorage.getItem('sales_returns_update_data'));
  
  if (convertToreturns && convertToreturns.invoiceToReturns){

    await showsalesreturnsData(convertToreturns.x, convertToreturns.x, convertToreturns.customer_id, 'invoice')
    const obj = {pageName : 'sales_returns_add_ar', x : convertToreturns.x}
    sessionStorage.setItem('sales_invoice_update_data', JSON.stringify(obj));                            
    back_href.href = `sales_invoice_update_ar`

  }else{


    Data =  await get_Data_for_add_page_fn()

    itemsDataArray =  Data.itemsDataArray;
    taxHeaderArray =  Data.taxHeaderArray;
    taxBodyArray =  Data.taxBodyArray;
    headerDataArray =  Data.headerDataArray;
    bodyDataArray =  Data.bodyDataArray;
    customersDataArray =  Data.customersDataArray;
    salesmanArray =  Data.salesmanArray;
    itemslocationsArray =  Data.itemslocationsArray;
    salesInvoiceReferencesArray =  Data.salesInvoiceReferencesArray;
  
      if (!Data || !itemsDataArray){
        await redirection('sales_qutation_view_ar','fail','حدث خطأ اثتاء معالجه البيانات')
        return
      }
      create_drop_down_with_External_DataArray(`dropdown_div3`,customersDataArray)
      create_drop_down_with_External_DataArray(`dropdown_div`,salesmanArray)
      create_drop_down_with_External_DataArray(`dropdown_div2`,itemslocationsArray)
      create_drop_down_with_External_DataArray(`dropdown_div4`,salesInvoiceReferencesArray)
      // await get_items_locations()
      build_table()
      addRow(itemsDataArray, taxHeaderArray) //! mtnsash te3del el addRow beta3 el zeror ely fe el table fe ele Buld_table() 5od de copy 7otaha henak

  }
                           

  makeTableRowsDraggable('myTable'); // make sure that the table already loaded
  hideLoadingIcon(content_space)
  
} catch (error) {
  hideLoadingIcon(content_space)
  catch_error(error)
}
})