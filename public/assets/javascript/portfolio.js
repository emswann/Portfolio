$(document).ready(() => {
  var setActive = element => {
    $("#navbar-list li.active").removeClass("active");
    $(element).addClass("active");
  };

  var clearContactForm = () => {
    $("#contact-form textarea").val("");
    $("#contact-form input").val("");
    $("#contact-form label").focus();
  }

  var isValidContact = () =>
    !($("#name").hasClass("invalid")
      || $("#email").hasClass("invalid")
      || $("#subject").hasClass("invalid"));

  $("#li-home, #btn-projects, .x-close").on("click", () => setActive("#li-home"));

  $("#li-profile").on("click", () => {
    $("body").scrollspy({target: "#profile"});
    setActive("#li-profile");
  });

  $("#li-projects").on("click", () => {
    $("#modalProjects").modal("show");
    setActive("#li-projects");
  });

  $("#li-contact").on("click", () => {
    $("#modalContactForm").modal("show");
    setActive("#li-contact");
  });

  $("#btn-contact").on("click", () => {
    event.preventDefault();

    if (isValidContact()) {
      var mailObj = {
        name: $("#name").val(),
        email: $("#email").val(),
        subject: $("#subject").val(),
        message: $("#message").val()
      };

      $("#modalContactForm").modal("hide");
      clearContactForm();
      setActive("#li-home");

      var url = "/api/send/mail/";

      console.log("POST request: " + url);

      $.ajax(url, {
        type: "POST",
        data: mailObj
      })
      .then(results => console.log("Contact mail sent successfully.")
      )
      .fail(error => console.error(error));
    }
    else {
      alert("Please correct errors in the contact form before submitting.");
    }
  });
});