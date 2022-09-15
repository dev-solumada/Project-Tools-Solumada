var evaluationDataTable = $('#evaluationDataTable').DataTable(
    {
        "ajax": {"url": "/allTL", "dataSrc": ""},
        "columns": [
            {'data': 'name'},
            {'data': "mcode"},
            {'data': 'strengths'},
            {'data': "weaknesses"},
            {'data': 'opportunities'},
            {'data': "threats"},
            {
                'defaultContent': `\
                    <div class= 'btn-group d-flex justify-content-center' role='group' aria-label='Basic mixed styles example'>\
                        <button type='button' class='btn px-2 px-2 rounded mx-1 btn-sm btn-warning btnUpdateEvaluationTL' data-toggle='modal' data-target='#modalUpdateInventaire' data-bs-whatever='@getbootstrap'><i class='fa fa-edit'></i></button>\
                        <button type='button' class='btn px2 btn-sm rounded btn-danger btnDeleteEvaluationTL'><i class='fa fa-trash'></i></button>\
                    <div>\
                `
            }
        ]
    }
)

$("#saveTL").on('click', function () {
    addTL = {
        name: $('#nameTL').val(),
        mcode: $('#m-code').val(),
        strengths: $('#strengths').val(),
        weaknesses: $('#weaknesses').val(),
        opportunities: $('#opportunities').val(),
        threats: $('#threats').val()
    }
    console.log("addTL", addTL);
    $.ajax({
        url: '/addTL',
        method: 'post',
        data: addTL,
        success: function (response) {
            if (response == 'error') {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ce TL est déjà existe'
                })
                clearForm()
                window.location = "/evaluationTL"
            } else {
                Swal.fire({
                    icon: 'réussi',
                    title: 'Nouveau Team Leader sauvegardé',
                    text: `Team Leader ${addTL.name} sauvegardé avec succès`,
                    timer: 2000
                })
                clearForm()
                $('#evaluationTL').DataTable().ajax.reload(null, false)
                window.location = "/evaluationTL"

            }
        }
    })
})

function clearForm() {
    $("#nameTL").val('')
    $('#m-code').val('')
    $('#numberTL').val('')
    $('#level').val('')
    $('#cancelTL').click()
}

// get user to update
var mcode = ""
$(document).on('click', '.btnUpdateEvaluationTL', function () {
    console.log("btnUpdateEvaluationTL");
    var getCol = $(this).closest('tr')
    mcode = getCol.find('td:eq(1)').text()
    var name = getCol.find('td:eq(0)').text()
    var strengthsUpdatTL = getCol.find('td:eq(2)').text()
    var weaknessesUpdat = getCol.find('td:eq(3)').text()
    var opportunitiesUpdatTL = getCol.find('td:eq(4)').text()
    var threatsUpdat = getCol.find('td:eq(5)').text()
    
    $("#nameUpdat").val(name)
    // $("#mcodeUpdate").val(mcode)
    $("#strengthsUpdatTL").val(strengthsUpdatTL)
    $("#weaknessesUpdat").val(weaknessesUpdat)
    $("#opportunitiesUpdatTL").val(opportunitiesUpdatTL)
    $("#threatsUpdat").val(threatsUpdat)
    // console.log("mcode", mcode);
    // UserUpdat = {
    //     name: $()
    // }
})

//save update user
$(document).on('click', '#saveUpdatTL', function(){
    var nameUpd = $('#nameUpdat').val();
    // var mcodeUpd = $('#mcodeUpdate').val();
    var strengthsUpdatTL = $('#strengthsUpdatTL').val();
    var weaknessesUpdat = $('#weaknessesUpdat').val();
    var opportunitiesUpdatTL = $('#opportunitiesUpdatTL').val();
    var threatsUpdat = $('#threatsUpdat').val();

    var userUpdate = {
        mcodeOld: mcode,
        name: nameUpd,
        strengths: strengthsUpdatTL,
        weaknesses: weaknessesUpdat,
        opportunities :opportunitiesUpdatTL,
        threats: threatsUpdat
    }

    //console.log("userUpdate", userUpdate);

    $.ajax({
        url: '/updateTl',
        method: "post",
        data: userUpdate,
        success: function (res) {
            console.log("res", res);
            Swal.fire(
                'Mise à jour',
                "Mise à jour de l'utilisateur avec succès ! ",
                'sucess',
                {
                    confirmButtonText: 'OK'
                }
            )
            // $('#nameUpdat').val("");
            // $('#mcodeUpdate').val("");
            // $('#numberUpdatTL').val("");
            // $('#levelUpdat').val("");
            $('#cancelTL').click()
            window.location = '/evaluationTL'

        }
    })
})


$(document).on('click', '.btnDeleteEvaluationTL', function() {
    Swal.fire({
        title: "Supprimer l'utilisateur",
        text: 'Etes-vous sûr de vouloir supprimer cet utilisateur?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'red',
        cancelButtonColor: 'green',
        confirmButtonText: 'Oui'
    }).then((result) =>{
        if (result.isConfirmed) {
            var getCol = $(this).closest('tr');
            var codeDelete = getCol.find('td:eq(1)').text();
            deleteMaterial = {
                mcode: codeDelete
            }
            $.ajax({
                url: '/deleteTeamLeader',
                method: 'post',
                data: deleteMaterial,
                success: function (res) {
                    responseTxt = 'Utilisateur supprimé avec succès!';
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: responseTxt,
                        showConfirmButton: true
                    })
                    $("#evaluationDataTable").DataTable().ajax.reload(null, false)
                },
                error: function (resp) {
                    Swal.fire({
                        position: 'top-center',
                        icon: 'error',
                        title: resp,
                        showConfirmButton: false,
                        timer: 1700
                    })
                }
            })
        } 
    })
})

var type =  $('#typeUtil').val()// document.getElementById("typeUtil")//$('#typeUtil').val();

if (type.trim() == "IT") {
    $("#utilisateur").css("display", "none")
    // console.log("page IT");
} else if (type.trim() == "TL") {
    $("#utilisateur").css("display", "none")
    // console.log("page TL");
} 