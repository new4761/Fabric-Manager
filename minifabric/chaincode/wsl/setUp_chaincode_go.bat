wsl ./minifab netup 
wsl ./minifab create -c testchannel
wsl ./minifab join
wsl ./minifab anchorupdate
:: wsl ./minifab profilegen
wsl ./minifab install -n simple
wsl ./minifab approve 
wsl ./minifab commit
wsl ./minifab initialize -p '"invoke","5","2","3","5"'
wsl ./minifab discover
wsl ./minifab invoke -p '"query","5"'
wsl ./minifab explorerup
pause