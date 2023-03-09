<?php
//phpinfo();
// $_POST    $_GET   $_REQUEST
// print_r($_POST);
// print_r($_GET);
// print_r($_REQUEST);
include("hidden.php"); //require
$mysqli = new mysqli($host, $user, $passwd, $dbname);
$mysqli->query("set names utf8");

if(isset($_POST['acc']) && $_POST['acc']=='add'){
    /*
    $sql = "insert into imiona(imie) values(?)";
    $stmt = $mysqli->prepare($sql);
    $stmt->bind_param("s", rawurldecode($_POST['imie']));
    $stmt->execute();
    */
    echo json_encode($_POST);
    $sql = "insert into full(id,zdjecie, nominal, nr_kat,stop,rok) values(NULL,?,?,?,?,?)"; //tu zmienić przy upload
    $stmt = $mysqli->prepare($sql);

    if ($stmt === false) {
        trigger_error($mysqli->error, E_USER_ERROR);
        return;
      }

    $stmt->bind_param("issis", rawurldecode($_POST['zdjecie']),rawurldecode($_POST['nominal']),rawurldecode($_POST['nr']),rawurldecode($_POST['stop']),rawurldecode($_POST['rok']));
    $stmt->execute();
}else if(isset($_POST['acc']) && $_POST['acc']=='get'){
    $sql = "select * from full inner join kraje on full.zdjecie = kraje.id inner join stop on full.stop=stop.id";
    $result = $mysqli->query($sql);
    $all = $result->fetch_all();
    echo json_encode($all); //wyświetlenie
}else if(isset($_POST['acc']) && $_POST['acc']=='getflag'){
    $sql = "select * from kraje";
    $result = $mysqli->query($sql);
    $all = $result->fetch_all();
    echo json_encode($all);
}else if(isset($_POST['acc']) && $_POST['acc']=='getstop'){
    $sql = "select * from stop";
    $result = $mysqli->query($sql);
    $all = $result->fetch_all();
    echo json_encode($all);
}else if(isset($_POST['acc']) && $_POST['acc']=='addek'){
    $sql = "insert into full(zdjecie, nominal, nr.kat,stop,rok) values(?,?,?,?)"; //tu zmienić przy upload
    $stmt = $mysqli->prepare($sql);
    $stmt->bind_param("issis", rawurldecode($_POST['imie']));
    $stmt->execute();
}else if(isset($_POST['acc']) && $_POST['acc']=='update'){
    echo json_encode($_POST);
    $sql = "UPDATE full SET zdjecie=?, nominal=?, nr_kat=?, stop=?, rok=? WHERE id=?"; //tu zmienić przy upload
    $stmt = $mysqli->prepare($sql);

    if ($stmt === false) {
        trigger_error($mysqli->error, E_USER_ERROR);
        return;
      }

    $stmt->bind_param("issisi", rawurldecode($_POST['zdjecie']),rawurldecode($_POST['nominal']),rawurldecode($_POST['nr']),rawurldecode($_POST['stop']),rawurldecode($_POST['rok']),rawurldecode($_POST['id']));
    $stmt->execute();
}else if(isset($_POST['acc']) && $_POST['acc']=='delete'){
    //echo json_encode($_POST);
    $sql = "DELETE FROM full WHERE id=?"; //tu zmienić przy upload
    $stmt = $mysqli->prepare($sql);

    if ($stmt === false) {
        trigger_error($mysqli->error, E_USER_ERROR);
        return;
      }

    $stmt->bind_param("i",rawurldecode($_POST['id']));
    $stmt->execute();
}


// select count(*) from users where login='".$_POST['user']"' and passwd='".$_POST['passwd']."'
// select count(*) from users where login='    ' or 1=1 --     ' and passwd='".$_POST['passwd']."'
// binduj!!!
?>
