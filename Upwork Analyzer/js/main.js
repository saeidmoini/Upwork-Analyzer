// ====search-select-box====
$(function () {
  $(
    "#originState,#originCity,#aimState,#aimCity,#truckType,#loaderType"
  ).select2();
});

// ===== disabled Input =====
$(document).ready(function () {
  $("select[id=category]").change(function () {
    if ((category) => "1") {
      $("select[id=loaderType]").removeAttr("disabled");
    } else {
      $("select[id=loaderType]").attr("disabled", true);
    }
  });
});
