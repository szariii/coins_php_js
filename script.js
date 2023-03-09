function start() {
    get(0, "")
    insert()
}

async function get(flagaedit, itemdoedycji) {
    console.log("get")
    const xhttp = new XMLHttpRequest();
    //console.log("blabla")
    //let imie = document.getElementById("imie").value

    await xhttp.open("POST", "ajax.php");

    xhttp.onreadystatechange = function () {
        // console.log(this.readyState);
        if (this.readyState == 4 && this.status == 200) {
            let jsonnie = JSON.parse(this.responseText);

            let json = jsonnie.sort(sortowanie)

            console.log(json);

            let tabkaid = []

            document.getElementById("table").innerText = "";
            let tr = document.createElement("tr")
            let th = document.createElement("th")
            tr.appendChild(th)
            th = document.createElement("th")
            th.innerText = "nominał"
            tr.appendChild(th)

            th = document.createElement("th")
            th.innerText = "nr kat."
            tr.appendChild(th)

            th = document.createElement("th")
            th.innerText = "stop"
            tr.appendChild(th)

            th = document.createElement("th")
            th.innerText = "rok"
            tr.appendChild(th)

            th = document.createElement("th")
            th.innerText = ""
            tr.appendChild(th)
            document.getElementById("table").appendChild(tr);

            for (let i = 0; i < json.length; i++) {
                tabkaid.push(json[i][0])
            }

            console.log(tabkaid)

            for (let i = 0; i < json.length; i++) {

                tr = document.createElement("tr")

                td = document.createElement("td")
                //console.log(json)
                td.innerHTML = '<img id="' + json[i][0] + '" onclick="edit(this, ' + json.length + ',[' + tabkaid + '])" class="flaga' + json[i][6] + '" src="data:image/png;base64,' + json[i][8] + '" alt="flaga"/>'
                td.classList.add(json[i][0])
                //td.id = i
                tr.appendChild(td)

                td = document.createElement("td")
                td.innerHTML = json[i][2]
                td.classList.add(json[i][0])
                tr.appendChild(td)

                td = document.createElement("td")
                td.innerHTML = json[i][3]
                td.classList.add(json[i][0])
                tr.appendChild(td)

                td = document.createElement("td")
                div = document.createElement("div")
                div.classList.add("stop" + json[i][9])
                div.id = "stop" + json[i][0]
                div.innerHTML = json[i][10]
                td.appendChild(div)
                td.classList.add(json[i][0])
                tr.appendChild(td)

                td = document.createElement("td")
                td.innerHTML = json[i][5]
                td.classList.add(json[i][0])
                tr.appendChild(td)

                td = document.createElement("td")
                td.innerHTML = '<img src="./img/u.gif" onclick="deleterec(' + json[i][0] + ')"/>'
                td.classList.add(json[i][0])
                tr.appendChild(td)
                //tr.innerText = json[i][1];
                document.getElementById("table").appendChild(tr);
            }
            console.log("get_caly")
            if (flagaedit == 1) {
                edit(itemdoedycji, json.length, tabkaid)
            }
        }
    }

    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("acc=get");
}

function edit(ele, ilosctr, tabkaid) {
    console.log("edit")
    //console.log(ele)
    const xhttp = new XMLHttpRequest();
    //console.log("blabla")
    //let imie = document.getElementById("imie").value

    xhttp.open("POST", "ajax.php");




    xhttp.onreadystatechange = function () {
        //console.log("bylo na gorze")
        if (this.readyState == 4 && this.status == 200) {
            let jsoni = JSON.parse(this.responseText);
            console.log(jsoni);


            //let targett = e.target
            //console.log(ele)
            let arr = Array.from(document.getElementsByClassName(ele.id))
            //console.log(arr)//dodać klase


            idRekordu = -1
            idRekorduWieksze = -1
            //console.log(jsoni.length)
            //console.log(ele.classList)

            for (let j = 0; j < jsoni.length; j++) {
                if (jsoni[j][0] == ele.id) {
                    idRekorduWieksze = j + 1
                    idRekordu = j
                }
            }



            console.log("idRekordu: " + idRekordu)
            //console.log(jsoni[idRekordu][2])
            //console.log(arr[2])
            arr[1].innerHTML = '<input type="text" id="nominal" value="' + jsoni[idRekordu][2] + '"/>'
            arr[2].innerHTML = '<input type="text" id="kat" value="' + jsoni[idRekordu][3] + '"/>'
            arr[4].innerHTML = '<input type="text" id="rok" value="' + jsoni[idRekordu][5] + '"/>'
            arr[5].innerHTML = '<img id="' + jsoni[idRekordu][0] + '" src="./img/faja.png" onclick="confirm(this)"/>'

            //console.log(ele.id)
            //console.log(document.getElementById("stop" + ele.id))
            flagi(ele, arr[0], 0)


            console.log(tabkaid)
            stopy(document.getElementById("stop" + ele.id), arr[3], 0)
            for (let j = 0; j < tabkaid.length; j++) {
                //document.getElementById(j).onclick = " "
                if (tabkaid[j] != idRekorduWieksze) {

                    console.log("j: " + tabkaid[j])

                    console.log(document.getElementById(tabkaid[j]))

                    //document.getElementById(j).onclick = " "
                    document.getElementById(tabkaid[j]).onclick = () => {
                        //console.log("to się wykonuje?")
                        console.log(document.getElementById(tabkaid[j]))
                        get(1, document.getElementById(tabkaid[j]))


                        //await edit(document.getElementById(j), ilosctr)
                    }


                }
            }
            //console.log("-------------------------------------------------------------")
        }
    }

    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("acc=get");

}

function flagi(ele, parent, flag) {
    //console.log(parent)
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "ajax.php");
    //console.log("no weszlo")
    console.log(ele)
    let clas = Array.from(ele.classList)
    //console.log(clas)
    let tabkaidzdjecia = clas[0].split("flaga")
    //console.log(tabkaidzdjecia)

    let idzdjecia = parseInt(tabkaidzdjecia[1])
    //console.log(idzdjecia)

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let jsonik = JSON.parse(this.responseText);
            //console.log(jsonik);



            let select = document.createElement("select")
            //document.getElementById()

            for (let m = 0; m < jsonik.length; m++) {
                let option = document.createElement("option")
                option.innerText = jsonik[m][1]
                option.value = jsonik[m][0]

                if (jsonik[m][0] == idzdjecia) {
                    //console.log("are you here?")
                    //console.log(idzdjecia)
                    option.selected = true;
                }

                select.appendChild(option)

            }

            parent.innerHTML = ""
            if (flag == 1) {
                select.id = "selectadd"
            } else {
                select.id = "select"
            }

            parent.appendChild(select)

        }

    }
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("acc=getflag");
}

function stopy(ele, parent, flag) {
    const xhttp = new XMLHttpRequest();
    //console.log("blabla")
    //let imie = document.getElementById("imie").value

    xhttp.open("POST", "ajax.php");
    //console.log("no weszlo")
    //console.log(ele)
    let clas = Array.from(ele.classList)
    //console.log(clas)
    let tabkaidzdjecia = clas[0].split("stop")
    //console.log(tabkaidzdjecia)

    let idzdjecia = parseInt(tabkaidzdjecia[1])
    //console.log(idzdjecia)

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let jsonik = JSON.parse(this.responseText);
            //console.log(jsonik);



            let select = document.createElement("select")
            //document.getElementById()

            for (let m = 0; m < jsonik.length; m++) {
                let option = document.createElement("option")
                option.innerText = jsonik[m][1]
                option.value = jsonik[m][0]

                if (jsonik[m][0] == idzdjecia) {
                    //console.log("are you here?")
                    //console.log(idzdjecia)
                    option.selected = true;
                }

                select.appendChild(option)

            }

            parent.innerHTML = ""
            if (flag == 1) {
                select.id = "addselects"
            } else {
                select.id = "selects"
            }
            parent.appendChild(select)

        }

    }

    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("acc=getstop");
}

async function confirm(faja) {
    //console.log(faja.id)

    let zdjecie = encodeURIComponent(document.getElementById("select").value);
    let nominal = encodeURIComponent(document.getElementById("nominal").value);
    let nr = encodeURIComponent(document.getElementById("kat").value);
    let stop = encodeURIComponent(document.getElementById("selects").value);
    let rok = encodeURIComponent(document.getElementById("rok").value);

    //console.log(zdjecie + " " + nominal + " " + nr + " " + stop + " " + rok + " " + faja.id)

    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "ajax.php");

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //let json = (this.responseText);
            //console.log(json)
            get(0, "");
        }
    }



    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("acc=update&id=" + faja.id + "&zdjecie=" + zdjecie + "&nominal=" + nominal + "&nr=" + nr + "&stop=" + stop + "&rok=" + rok);
}

function insert() {
    //console.log(json);
    document.getElementById("dodajka").innerText = "";
    let tr = document.createElement("tr")
    let th = document.createElement("th")

    fejkflaga = document.createElement("img")
    fejkflaga.classList.add("flaga1")

    flagi(fejkflaga, th, 1)
    tr.appendChild(th)

    th = document.createElement("th")
    th.innerHTML = "<input type='text' id='dodnominal'>"
    tr.appendChild(th)

    th = document.createElement("th")
    th.innerHTML = "<input type='text' id='dodnr'>"
    tr.appendChild(th)

    th = document.createElement("th")

    fejkflaga = document.createElement("img")
    fejkflaga.classList.add("stop1")

    stopy(fejkflaga, th, 1)

    tr.appendChild(th)

    th = document.createElement("th")
    th.innerHTML = "<input type='text' id='dodrok'>"
    tr.appendChild(th)

    th = document.createElement("th")
    th.innerHTML = "<img src='./img/faja.png' onclick='add()'>"
    tr.appendChild(th)
    document.getElementById("dodajka").appendChild(tr);
}

function add() {
    const xhttp = new XMLHttpRequest();
    let zdjecie = encodeURIComponent(document.getElementById("selectadd").value);
    let nominal = encodeURIComponent(document.getElementById("dodnominal").value);
    let nr = encodeURIComponent(document.getElementById("dodnr").value);
    let stop = encodeURIComponent(document.getElementById("addselects").value);
    let rok = encodeURIComponent(document.getElementById("dodrok").value);
    xhttp.open("POST", "ajax.php");

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let jsonik = this.responseText;
            console.log(jsonik);
            get(0, "");
            insert()
        }
    }

    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("acc=add&zdjecie=" + zdjecie + "&nominal=" + nominal + "&nr=" + nr + "&stop=" + stop + "&rok=" + rok);
}

function deleterec(id) {
    const xhttp = new XMLHttpRequest();

    xhttp.open("POST", "ajax.php");

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let jsonik = this.responseText;
            console.log(jsonik);
            get(0, "");
        }
    }

    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("acc=delete&id=" + id);
}

function sortowanie(a, b) {
    if (a[1] == b[1]) {
        return 0;
    } else {
        if(a[1] < b[1]){
            return -1
        }else{
            return 1
        }
    }
}