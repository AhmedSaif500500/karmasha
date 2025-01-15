<!DOCTYPE html>
<html lang="en" dir="rtl">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title></title>
  <link rel="stylesheet" href="/public/css/style.css" />
  <link rel="stylesheet" href="/public/css/fontawesome-free-6.4.2-web/css/all.min.css" />
  <link rel="stylesheet" href="/public/flatpickr/dist/flatpickr.min.css">


</head>

<body class="body scroll">
  <script src="/public/scripts/darkmode.js"></script>
  <div id="alert-container" class="alert-container"></div>
  <div id="body_content">
    <script src="/public/scripts/ar/Authentication_ar.js"></script>
    <button id="scrollToTopBtn">&#9650;</button>

    <!-- start ------------------------------------------------------------------------------------------>
    <div class="header" id="header_div"></div>

    <div class="sub_container">
      <div id="sidebar" class="sidebar scroll"></div>

      <div id="white_backcolor" class="white_backcolor">
        <!-- content -->
        <div id="content_space" class="scroll">

          <h2 id="h2" class="h2">
            <a id="back_href" class="back_href" href="sales_invoice_view_ar" title="فواتير المبيعات">
              <i class="fa-solid fa-arrow-right back_icon"></i>
            </a>
            <div class="h2_main_text_div">
              <a id="h2_text_div" class="h2_text_div" href="sales_invoice_update_ar" title="اعادة تحميل الصفحة">
                فواتير المبيعات
                <!-- <button class="btn_search">وضع التعديل</button> -->
              </a>
              <span id="sub_h2_header" class="sub_h2_header">عرض</span>
            </div>
          </h2>

          <div id ="fn_container_div" class="fn_container_div"></div>

          <div id="page_content" style="display: none;">
            <!-- ________________________________________________CONTENT_____________________________________________________________ -->

            <div class="reference_and_date_div">
              <div class="column x_start y_start w_fit">
                <!-- date -->
                <label for="date1" class="lbl_sm">التاريخ</label>
                <div class="input_with_icon_div">
                  <input type="search" id="date1" class="hover input_date datepicker" placeholder="التاريخ..." readonly
                    autocomplete="off">
                  <i class="fa-regular fa-calendar left_icon"></i>
                </div>
              </div>

              <div class="column x_start y_start w_fit">
                <!-- Due Date -->
                <label for="dueDate_input" class="lbl_sm">تاريخ الاستحقاق</label>
                <div class="input_with_icon_div">
                  <input type="search" id="dueDate_input" class="hover input_date datepicker" placeholder="التاريخ..." readonly
                    autocomplete="off">
                  <i class="fa-regular fa-calendar left_icon"></i>
                </div>
              </div>
              
              <div class="column x_start y_start w_fit">
                <label for="reference_input" class="lbl_sm">المرجع</label>
                <div class="input_with_icon_div">
                  <span class="reference_input_checkbox"><input type="checkbox" id="reference_input_checkbox" checked disabled title="تلقائى"></span>
                  <input type="search" id="reference_input" class="reference_input reference_input_auto_mode hover"
                    oninput="check_parse(this,'number')" placeholder="تلقائى" autocomplete="off">
                </div>
              </div>
            </div>


            <div class="row y_start x_start nowrap gap_10">
              <div class="column">
                <label for="note_inpute" class="lbl_sm">العميل</label>
                <div id="dropdown_div3" class="dropdown_container"></div>
              </div>
              <div class="column order_reference_div">
                <label for="note_inpute" class="lbl_sm">امر البيع</label>
                <div id="dropdown_div4" class="dropdown_container" style="width: 13rem"></div>
              </div>
              <div class="column qutation_reference_div">
                <label for="note_inpute" class="lbl_sm">عرض السعر</label>
                <div id="dropdown_div5" class="dropdown_container" style="width: 13rem"></div>
              </div>
            </div>

            <label for="note_inpute" class="lbl_sm">البيان العام</label>
            <input type="search" id="note_inpute" class="input_text_xl hover" autocomplete="off">



            <!-- table -->

            <table id="myTable" class="input_table">
              <thead class=""></thead>
              <tbody class=""></tbody>
              <tfoot class=""></tfoot>
            </table>

            <label for="note_inpute" class="lbl_sm">البائع</label>
            <div id="dropdown_div" class="dropdown_container"></div>


            <label for="note_inpute" class="lbl_sm">موقع المخزون</label>
            <div id="dropdown_div2" class="dropdown_container" style="margin-block-end: 2rem;"></div>



              <div class="input_with_icon_div notView">
                <span class="reference_input_checkbox"><input type="checkbox" id="is_RowNote_checkBox" title="تفعيل هذه الخاصية يسمح باختيار الموظف كبائع  فى فواتير المبيعات"></span>
                <span class="span">عمود البيان</span>
              </div>

              <div class="input_with_icon_div notView">
                <span class="reference_input_checkbox"><input type="checkbox" id="is_RowDiscount_checkBox" title="تفعيل هذه الخاصية يسمح باختيار الموظف كبائع  فى فواتير المبيعات"></span>
                <span class="span">عمود الخصم</span>
              </div>


            <div class="btn_container_top_border notView" style="display: none;">
              <button class="btn_update" id="btn_update">تحديث</button>
              <button class="btn_cancel" id="btn_delete">حذف</button>
            </div>

          </div>
        </div>
      </div>
    </div>

  </div>

  </div>
  <script>

  </script>

  <!-- scripts------------------------------------------------------------------------------ -->
  <script src="/public/flatpickr/dist/flatpickr.min.js"></script> <!-- lazem da ykon apl el main.js -->
  <script src="/public/socket/socket.io.min.js"></script>
  <script src="/public/scripts/main.js"></script> <!-- lazem da ykon a5er malaf -->
  <script src="/public/scripts/ar/sales_management/sales/sales_invoice/sales_invoice_multi_pages.js"></script>
  <script src="/public/scripts/ar/sales_management/sales/sales_invoice/sales_invoice_update_ar.js"></script>

</body>

</html>