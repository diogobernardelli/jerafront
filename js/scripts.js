$(function () {
    // SEARCH TOP BAR
    $('.search a').click(function () {
        $('.search a').hide();
        $('.search input').fadeIn(100);
        $('.search input').focus();
    });
    $('.search input').focusout(function () {
        $('.search input').hide();
        $('.search i').hide();
        $('.search a').show();
        $('.search i').fadeIn(300);
    });

    // USER INFO TOP BAR
    $('.user-info').click(function () {
        $('.user-info-sub').show();
        $('.user-info').addClass('user-info-selected');
    });
    $('.user-info').mouseleave(function () {
        $('.user-info-sub').hide();
        $('.user-info').removeClass('user-info-selected');
    });

    // TOOLTIP
    $(".classTitle").tipTip({maxWidth: "auto", edgeOffset: 10});

    //ACCORDION
    $('#menu-home a').addClass('active');
    var menu_ul = $('.menu > li > ul'),
        menu_a = $('.menu > li > a');

    menu_ul.hide();

    menu_a.click(function (e) {
        e.preventDefault();
        if (!$(this).hasClass('active')) {
            menu_a.removeClass('active');
            menu_ul.filter(':visible').slideUp('normal');
            $(this).addClass('active').next().stop(true, true).slideDown('normal');
        } else {
            $(this).removeClass('active');
            $(this).next().stop(true, true).slideUp('normal');
        }
    });
    
    // EXIBE CONTEÚDO HOME.HTML AO ACESSAR SISTEMA WEB
    mostraDivMenu('home');
    
    //DATEPICKER
    $(".dataBusca").datepicker(datepickerDefaults);
    
    initJqtable();
    
});

datepickerDefaults = {
    defaultDate: new Date(),
    minDate: new Date(2015, 0, 1)
};

// MOSTRA DIV
function mostraDivMenu(nome_div, id) {
    showLoader();
    $.get("includes/" + nome_div + ".html", function (data) {
        clearAllTimeOuts();
        $("#main-content").html(data);
        for (var selector in config) {
            $(".select").chosen(),
            $(".dataTables_wrapper select").chosen({disable_search: true});
        }
        createChosen();
        $('.back-sidebar').hide();
        $(".dataBusca").datepicker(datepickerDefaults);
        initJqtable();
        $(".classTitle").tipTip({maxWidth: "auto", edgeOffset: 10});
    });
    hideLoader();
}

function accordionMenu(opcao_menu, id) {
    $("#menu"+opcao_menu+"").trigger('click');
}

function showLoader() {
    $("#loader").show();
}

function hideLoader() {
    setTimeout(function () {
        $("#loader").hide();
    }, 600);
}

function destroyChosen() {
    $(".select").chosen('destroy');
    $(".select-off").chosen('destroy');
}
function createChosen() {
    $(".select").chosen();
    $(".select-off").chosen({disable_search: true});
}


//CHOSEN SELECT
var config = {
    '.chosen-select': {}
}

//DATATABLE
function initJqtable() {
    $('.tableJquery').DataTable({
        "paging":   true,
        "info":     true,
        "bRetrieve": true,
        "paging": false,
        "oLanguage": {
            "oPaginate": {
                "sPrevious": "Anterior",
                "sNext": "Próximo",
                "sFirst": "Primeiro",
                "sLast": "Último"
            },
            "sLengthMenu": "Mostrar _MENU_ resultados por página",
            "sZeroRecords": "Nenhum registro encontrado",
            "sInfo": "Exibindo <strong>_START_</strong> até <strong>_END_</strong> de <strong>_TOTAL_</strong> registros",
            "sInfoEmpty": "Exibindo 0 até 0 de 0 registros",
            "sInfoFiltered": "(filtrado de um total de <strong>_MAX_</strong> registros)",
            "sSearch": "Busca Rápida:"
        },
//        dom: 'Bfrtip',
        dom: 'Bfrti',
        buttons: [
            {
                extend: 'print',
                title: window.top.document.title,
                customize: function ( win ) {
                    var html = '<div class="line-print">';
                    $(".formBusca", parent.document).find(':input').each(function(){
                        if (typeof this.labels[0] != "undefined") {
                            html += '<div class="campo">';
                            html += '<strong>';
                            html += this.labels[0].outerText.replace(":", "");
                            html += '</strong>';
                            html += '<br />';
                            if ($(this).attr('type') == "text") {
                                html += $(this).val();
                            } else if ($(this).find('option:selected') && $(this).find('option:selected').val() != "-1") {
                                html += $(this).find('option:selected').text();
                            }
                            html += '</div>';
                        }
                    });
                    html += '</div>';
                    $(win.document.body)
                        .prepend( html )
                        .find( 'table' )
                        .addClass( 'compact' )
                        .css( 'font-size', 'inherit' );
                }
            },
            //'excel', 'pdf', 'copy',
            {
                extend: 'collection',
                text: 'Exportar',
                buttons: [ 'excel', 'pdf', 'copy' ]
            }
        ]

    });
}

//SIDEBAR INTERAÇÃO
function openSidebar() {
    $('.sidebar').addClass('sidebar-open');
    $('.back-sidebar').fadeIn(100);
}
function closeSidebar() {
    $('.sidebar').removeClass('sidebar-open');
    $('.back-sidebar').fadeOut(100);
}


//SIDEMENU INTERAÇÃO
function closeSideMenu() {
    $('.side-menu').addClass('side-menu-hide');
    $('.main-content').addClass('main-content-show');
    $('.top-menu').addClass('top-menu-show');
    $('.back-sidebar').addClass('back-sidebar-bigger');
    $('.result').addClass('result-open');
    $(".action-menu").attr("onclick","openSideMenu()");
}
function openSideMenu() {
    $('.side-menu').removeClass('side-menu-hide');
    $('.main-content').removeClass('main-content-show');
    $('.top-menu').removeClass('top-menu-show');
    $('.back-sidebar').removeClass('back-sidebar-bigger');
    $('.result').removeClass('result-open');
    $(".action-menu").attr("onclick","closeSideMenu()");
}


//RESULT SUCCESS / ERROR
function closeResult() {
    $('.result').hide();
}