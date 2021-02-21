 ::minifabwin netup 
::minifabwin create -c testchannel
::minifabwin join
::minifabwin anchorupdate
::minifabwinfab profilegen
call minifabwin install -n simple -r false -l java -v 1.8
call minifabwin approve 
call minifabwin commit
call minifabwin initialize  -p \"init\",\"5\",\"2\",\"3\",\"5\"
call minifabwin discover
call minifabwin invoke -p \"query\",\"5\"
::minifabwin explorerup
pause