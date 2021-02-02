 ::minifabwin netup 
 ::minifabwin create -c testchannel
 ::minifabwin join
 ::minifabwin anchorupdate
 ::minifabwinfab profilegen
call minifabwin install -n simple -l go -v 1.0
call minifabwin approve 
call minifabwin commit
call minifabwin initialize  -p \"invoke\",\"5\",\"2\",\"3\",\"5\"
call minifabwin discover
call minifabwin invoke -p \"query\",\"5\"
::minifabwin explorerup
pause