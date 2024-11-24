<?php
    // Connection details
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "ResourceGame";

    try {
        // Connect to the database using PDO
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        // Get players database
        $stmt = $conn->prepare("SELECT * FROM players");
        $stmt->execute();
        $playersData = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Get stock database
        $stmt = $conn->prepare("SELECT * FROM stock");
        $stmt->execute();
        $stockData = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Get players in game
        $playersInGame = [];
        for ($i = 0; $i < count($playersData); $i++) {
            $inGame = $playersData[$i]['InGame'];
            $admin = $playersData[$i]['Admin'];

            if($inGame == 1 && $admin != 1) {
                array_push($playersInGame, $i);
            }
        }

        // Get offerts from players and sort them
        $playersOfferts = [];
        for ( $i = 0; $i < count($playersInGame); $i++) {
            $playerOfferts = [];

            $stmt = $conn->prepare("SELECT * FROM offerts WHERE Player=$playersInGame[$i]"); // OFFERTS!!
            $stmt->execute();
            $playerOfferts = $stmt->fetchAll(PDO::FETCH_ASSOC);

            array_push($playersOfferts,$playerOfferts);
        }

        // Calculte money from offerts
        $eranedMoneyArray = [];
        for($i = 0; $i < count($playersInGame); $i++) {
            $eranedMoney = 0;

            for ($j = 0; $j < count($playersOfferts[$i]); $j++) {
                // Get offer details
                $player = $playersOfferts[$i][$j]['Player'];
                $product = $playersOfferts[$i][$j]['Product'];
                $amount = $playersOfferts[$i][$j]['Amount'];
                $price = $playersOfferts[$i][$j]['Price'];

                // Push offer
                $offertsToSplitDemand = [];
                array_push($offertsToSplitDemand, [$player, $product, $amount, $price]);
                
                // Search for similar offerts
                for ($p = $i+1; $p < count($playersOfferts); $p++) {
                    for ($b = 0; $b < count($playersOfferts[$p]); $b++) {
                        $playerBuffor = $playersOfferts[$p][$b]['Player'];
                        $productBuffor = $playersOfferts[$p][$b]['Product'];
                        $amountBuffor = $playersOfferts[$p][$b]['Amount'];
                        $priceBuffor = $playersOfferts[$p][$b]['Price'];
    
                        if ($product == $productBuffor) {
                            $similar = false;
                            $modulobuffor = $priceBuffor % 10;
                            $modulo = $price % 10;
                            
                            if (abs($priceBuffor - $price) <= 10) {
                                if (($modulo > 5 && $modulobuffor > 5) || ($modulo == 0 || $modulobuffor == 0)) {
                                    $similar = true;
                                }
                                else if (($modulo <= 5 && $modulobuffor <= 5) && ($modulo != 0 && $modulobuffor != 0)) {
                                    $similar = true;
                                }
    
                                if ($similar) {
                                    array_push($offertsToSplitDemand, [$playerBuffor, $productBuffor, $amountBuffor, $priceBuffor]);
                                }
                            }
                        }
                    }
                }
                
                // Determine how much of a product is going to be sold as defined cost and how much will be sold lesser
                $demandForOffer = 0;
                $indexInStock = 0;

                for ($l = 0; $l < count($stockData); $l++ ) {
                    if ($offertsToSplitDemand[0][1] == $stockData[$l]['Product']) {
                        if ((abs($offertsToSplitDemand[0][3] - $stockData[$l]['Price']) < 10) && (abs($offertsToSplitDemand[0][3] - $stockData[$l]['Price']) >= 0)) {
                            $valid = false;
                            $modulo = $offertsToSplitDemand[0][3] % 10;
                            $modulobuffor = $stockData[$l]['Price'] % 10;
                            
                            if (($modulo > 5 && $modulobuffor > 5) || ($modulo == 0 || $modulobuffor == 0)) {
                                $valid = true;
                            }
                            else if (($modulo <= 5 && $modulobuffor <= 5) && ($modulo != 0 && $modulobuffor != 0)) {
                                $valid = true;
                            }

                            if ($valid) {
                                $index = $l+1;    
                                while($stockData[$index]['Price'] < $playersOfferts[$i][$j]['Price']) {
                                    $index++;
                                }

                                $demandForOffer = $stockData[$index]['Demand'];
                                if ($offertsToSplitDemand[0][3] > $stockData[$index]['Price'])  {
                                    $offertsToSplitDemand[0][3] = $stockData[$index]['Price'];
                                }
                        
                                $indexInStock = $index;
                                break; 
                            }
                        }
                    }
                }
                
                // Split share of demand
                $sumOfoffertsForThreshold = 0;
                for($h = 0; $h < count($offertsToSplitDemand); $h++) {
                    $sumOfoffertsForThreshold += $offertsToSplitDemand[$h][2];
                }

                $shareForOffer = number_format($offertsToSplitDemand[0][2] / $sumOfoffertsForThreshold, 1);
                $buffor = $demandForOffer;

                if ($sumOfoffertsForThreshold < $demandForOffer) {
                    $buffor = $sumOfoffertsForThreshold;
                }

                $whatCanBeSell = $buffor * $shareForOffer;

                // Prefer lower prices
                if($whatCanBeSell < 1 && $whatCanBeSell > 0) {
                    $value = $offertsToSplitDemand[0][3];  
                    $IsNotLowest = false;
                    for($h = 0; $h < count($offertsToSplitDemand); $h++) {
                        if ($value > $offertsToSplitDemand[$h][3]) {
                            $IsNotLowest = true;
                            break;
                        }
                    }

                    if ($IsNotLowest) {
                        $whatCanBeSell = 0;
                    }
                    else {
                        $whatCanBeSell = 1;
                    }
                }

                $whatCanBeSell = ceil($whatCanBeSell);

                // Sell product
                $playersOfferts[$i][$j]['Amount'] -= $whatCanBeSell;
                if ($playersOfferts[$i][$j]['Amount'] < 0) {
                    $whatCanBeSell -= $playersOfferts[$i][$j]['Amount'];
                    $playersOfferts[$i][$j]['Amount'] = 0;
                }

                $eranedMoney += ($whatCanBeSell * $offertsToSplitDemand[0][3]);

                // Update database and check does eveything was sold or not
                $stockData[$indexInStock]['Demand'] -= $whatCanBeSell;
                if ($playersOfferts[$i][$j]['Amount'] > 0) {
                    $playersOfferts[$i][$j]['Price'] = $stockData[$indexInStock-1]['Price'];
                    $j--;
                }
            }

            // Update money
            $buffor = [$playersInGame[$i], $eranedMoney];
            array_push($eranedMoneyArray, $buffor);
            $playersData[$playersInGame[$i]]['Money'] += $eranedMoney;
        }
        // Wyzeruj produkty
        echo "<script> let earnedMoney = " . json_encode($eranedMoneyArray) . "; </script>";
        echo "<script> playersData = " . json_encode($playersData) . "; </script>";
    }
    catch (Exception $e) {
        echo "". $e->getMessage() ."";
    }
?>