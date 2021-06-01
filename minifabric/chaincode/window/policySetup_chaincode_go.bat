
 ::minifabwin netup 
 ::minifabwin create -c testchannel
 ::minifabwin join
 ::minifabwin anchorupdate
 ::minifabwinfab profilegen
call minifabwin install -n simple -l go -v 1.1 -r true -y OR(\"org0-example-com.member\",\"org1-example-com.member\")
call minifabwin approve 
call minifabwin commit
call minifabwin initialize  -p \"wtf\",\"a\",\"5\",\"b\",\"2\"
call minifabwin discover
call minifabwin invoke -p \"query\",\"a\"
::minifabwin explorerup

pause