document.getElementById("form1").addEventListener("submit", submitFun1);

var studentDataArr = JSON.parse(localStorage.getItem("studentData")) || [];

function submitFun1(e) {
    e.preventDefault();

    var name = document.querySelector("#name").value;
    var number = document.querySelector("#number").value;
    var city = document.querySelector("#city").value;
    var rollNo = document.querySelector("#rollNo").value;

    var studentObj = {
        name: name,
        number: number,
        city: city,
        rollNo: rollNo,
        present: 0,
        absent: 0
    };

    studentDataArr.push(studentObj);

    localStorage.setItem("studentData", JSON.stringify(studentDataArr));

    document.querySelector("#form1").reset();

    alert("Student Added Successfully");

    displayFun(studentDataArr);
}

function displayFun(studentDataArr) {

    document.querySelector("#tbody").innerHTML = "";

    var count = 1;

    var totalPresent = 0;
    var totalClasses = 0;

    studentDataArr.forEach(function (item, index) {

        var tr = document.createElement("tr");

        var td1 = document.createElement("td");
        td1.innerHTML = count++;

        var td2 = document.createElement("td");
        td2.innerHTML = item.name;

        var td3 = document.createElement("td");
        td3.innerHTML = item.number;

        var td4 = document.createElement("td");
        td4.innerHTML = item.city;

        var td5 = document.createElement("td");
        td5.innerHTML = item.rollNo;

        var td6 = document.createElement("td");
        td6.innerHTML = item.present || 0;

        var td7 = document.createElement("td");
        td7.innerHTML = item.absent || 0;

        var total = (item.present || 0) + (item.absent || 0);

        var percentage = 0;

        if (total > 0) {
            percentage = ((item.present / total) * 100).toFixed(2);
        }

        var td8 = document.createElement("td");
        td8.innerHTML = percentage + "%";

        var td9 = document.createElement("td");

        if (percentage >= 75) {
            td9.innerHTML = "Good";
            td9.style.color = "green";
        } else {
            td9.innerHTML = "Low";
            td9.style.color = "red";
        }

        var td10 = document.createElement("td");
        td10.classList.add("td6");

        var btn1 = document.createElement("button");
        btn1.innerHTML = "P";

        btn1.addEventListener("click", function () {

            studentDataArr[index].present++;

            localStorage.setItem(
                "studentData",
                JSON.stringify(studentDataArr)
            );

            displayFun(studentDataArr);
        });

        var btn2 = document.createElement("button");
        btn2.innerHTML = "A";

        btn2.addEventListener("click", function () {

            studentDataArr[index].absent++;

            localStorage.setItem(
                "studentData",
                JSON.stringify(studentDataArr)
            );

            displayFun(studentDataArr);
        });

        td10.append(btn1, btn2);

        tr.append(
            td1,
            td2,
            td3,
            td4,
            td5,
            td6,
            td7,
            td8,
            td9,
            td10
        );

        document.querySelector("#tbody").append(tr);

        totalPresent += item.present || 0;
        totalClasses += total;
    });

    var overallPercentage = 0;

    if (totalClasses > 0) {
        overallPercentage = (
            (totalPresent / totalClasses) * 100
        ).toFixed(2);
    }

    var attendanceHeading =
        document.getElementById("overallAttendance");

    if (attendanceHeading) {
        attendanceHeading.innerHTML =
            "Overall Class Attendance : " +
            overallPercentage +
            "%";
    }
}

displayFun(studentDataArr);