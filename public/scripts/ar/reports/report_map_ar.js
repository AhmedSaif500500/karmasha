//setActiveSidebar('salesMain_view_ar');
//pagePermission('view','salesman_permissions',"sales_qutation_permission","sales_order_permission","sales_invoice_permission","sales_returns_permission");


//! statement_div
const finance_statemebt_dive = document.querySelector(`#finance_statemebt_dive`)
const trial_balance = document.querySelector(`#trial_balance`)

//! sales_div


function showData(){
  finance_statemebt_dive.style.display = style= module_display("sales_qutation_permission") // 
  trial_balance.style.display = style= module_display("sales_order_permission") // 

   
  trial_balance.onclick = function(){
    // sessionStorage.removeItem('sales_qutation_ViewArray');
    window.location.href = "/trial_balance_view_ar";
  }
  

  page_content.style.display = 'flex'
}

/*
function remove_arrays(){
  sessionStorage.removeItem('salesmansConditionsArray');
  sessionStorage.removeItem('sales_order_update_data');
  sessionStorage.removeItem('sales_order_ViewArray');
  sessionStorage.removeItem('sales_qutation_ViewArray');
  sessionStorage.removeItem('sales_qutation_update_data');
  sessionStorage.removeItem('sales_invoice_Array');
  sessionStorage.removeItem('sales_invoice_update_data');
  sessionStorage.removeItem('sales_returns_Array');
}
  */


document.addEventListener('DOMContentLoaded', function() {
  try {
    showLoadingIcon(content_space)
    showData()
    showRedirectionReason();
    hideLoadingIcon(content_space)
  } catch (error) {
    catch_error(error)
  }
  });