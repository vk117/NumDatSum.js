
/**
 * NumDatSum.js - NumericalDataSummary.js
 *
 * This program contains all of the functions that
 * will run after the user inputs data into the
 * text area and clicks the "Calculate" buttton.
 *
 * @author Vikram Pasumarti, vpasuma@purdue.edu
 * @version 27 October 2016
 */


/**
 * The dataset is inputted as an array of numbers. The function
 * calculates and returns the mean, also known as the average, of
 * the dataset.
 */
function mean(array) {
    var sum = 0;
    var average = 0;
    for (i = 0; i < array.length; i++) {
        sum = sum + array[i];
    }
    average = sum / (array.length);
    return average;
}

/**
 * The dataset is inputted as an array of numbers. The function
 * returns the median, or middle value of the data. Depending on if
 * the number of values in the dataset are odd or even, the function
 * uses a different technique to calculate the median.
 */
function median(array) {
    var index = 0;
    if (array.length % 2.0 != 0.0) {
        index = ((array.length - 1) / 2);
        return array[index];
    } else {
        var index2 = 0;
        index2 = (array.length / 2);
        index = index2 - 1;
        return (array[index] + array[index2]) / 2;
    }
}

/**
 * The dataset is inputted as an array of numbers. The function
 * returns an array of all mode values in the dataset. The
 * mode is defined as the most frequently occuring value in a
 * dataset. If multiple values occur the same number of times, the
 * function will return all of the recurring values. However, if all
 * values occur the same number of times or if there is only one
 * element in the array, the function will return "No Mode".
 */
function mode(array) {
    var dataValues = [];
    var results = [];
    for(i = 0; i < array.length; i++) {
        if (dataValues.indexOf(array[i]) == -1) {
            dataValues.push(array[i]);
        }
    }
    var modeCount = [];
    var count = 0;
    for(j = 0; j < dataValues.length; j++) {
        count = 0;
        for (k = 0; k < array.length; k++) {
            if (dataValues[j] == array[k]) {
                count = count + 1;
                modeCount[j] = count;
            }
        }
    }
    var maxCount = max(modeCount);
    var check = 0;
    for (i = 0; i < modeCount.length; i++) {
        check = check + (modeCount[i] - modeCount[0]);
    }
    for (i = 0; i < modeCount.length; i++) {
        if (modeCount[i] == maxCount && check != 0) {
            results.push(dataValues[i]);
        }
    }
    if (results[0] == undefined) {
        return "No Mode";
    }
    return results;
}

/**
 * The mean and median are inputted into this function. To determine
 * the skew of the dataset, the function simply compares the values
 * of the mean and median to see which is greater, or if they
 * are equal.
 */
function skew(meanVal, medianVal) {

    if (meanVal == medianVal) {
        return "Symmetrical";
    } else if (meanVal > medianVal) {
        return "Right Skewed";
    } else if (meanVal < medianVal) {
        return "Left Skewed";
    } else {
        return "Error";
    }
}

/**
 * The dataset is inputted as an array of numbers. The function
 * calculates and returns the standard deviation of the dataset.
 * The standard deviation shows how close the data is to the mean.
 */
function stdDev(array) {
    var sum = 0;
    var variance = 0;
    var meanVal = mean(array);
    for (i = 0; i < array.length; i++) {
        sum = sum + Math.pow((array[i] - meanVal), 2);
    }
    variance = ((1 / (array.length - 1)) * (sum));
    return Math.sqrt(variance);
}

/**
 * The dataset is inputted as an array of numbers. The function
 * calculates and returns the range, which is simply the difference
 * between the maximum value and minimum value of the dataset.
 */
function range(array) {
    return max(array) - min(array);
}

/**
 * The dataset is inputted as an array of numbers. The function
 * calculates and returns the first quartile, also known as the
 * median of the first quarter of the dataset. The function checks
 * if the result of the length of the dataset divided by four is
 * an integer or not. This will determine how the quartile will be
 * calculated. It should be noted that there are different ways to
 * calculate quartiles, and with smaller datasets there may be slight
 * differences in the answer based on how the quartiles are calculated.
 * @return {number} (If the "@return" is removed, errors thrown in the
 * else block)
 */
function Q1(array) {
    var d1 = array.length / 4;
    var integerCheck = d1 % 1;
    if (integerCheck != 0) {
        return array[Math.ceil(d1) - 1];
    } else {
        return ((array[d1 - 1] + array[d1]) / 2);
    }
}

/**
 * The dataset is inputted as an array of numbers. The function
 * calculates and returns the third quartile, also known as the
 * median of the third quarter of the dataset. The function checks
 * if the result of three times the length of the dataset divided
 * by four is an integer or not. This will determine how the quartile will be
 * calculated. It should be noted that there are different ways to
 * calculate quartiles, and with smaller datasets there may be slight
 * differences in the answer based on how the quartiles are calculated.
 * @return {number} (If the "@return" is removed, errors thrown in the
 * else block)
 */
function Q3(array) {
    var d3 = (3 * array.length )/ 4;
    var integerCheck = d3 % 1;
    if (integerCheck != 0) {
        return array[Math.ceil(d3) - 1];
    } else {
        return ((array[d3 - 1] + array[d3]) / 2);
    }
}

/**
 * The dataset is inputted as an array of numbers. The function
 * calculates and returns the interquartile range which is simply
 * the difference between the first and third quartiles.
 */
function iqr(array) {
    var Q1val = Q1(array);
    var Q3val = Q3(array);
    return Q3val - Q1val;
}

/**
 * The dataset is inputted as an array of numbers. The function returns
 * the five number summary of the dataset. The five number summary
 * is the all of the information needed to draw a box plot, the minimum,
 * maximum, first quartile, median, and third quartile.
 */
function fiveNumSummary(array) {
    var maxVal = max(array);
    var minVal = min(array);
    var Q1val = Q1(array);
    var Q3val = Q3(array);
    var medianVal = median(array);
    return "Minimum = " + minVal + ", Q1 = " + Q1val + ", Median = " + medianVal + ", Q3 = " + Q3val + ", Maximum = " + maxVal;
}

/**
 * The dataset is inputted as an array of numbers. The function
 * calculates and returns the conditions for which outliers
 * in the dataset exist. It calculuates inner and outer fences
 * to determine at what intervals would mild or extreme outliers
 * exist.
 */
function outliers(array) {
    var Q1val = Q1(array);
    var Q3val = Q3(array);
    var iqrVal = iqr(array);
    var ifl = Q1val - (1.5 * iqrVal);
    var ifh = Q3val + (1.5 * iqrVal);
    var ofl = Q1val - (3 * iqrVal);
    var ofh = Q3val + (3 * iqrVal);
    var outlierArray = [];
    outlierArray[0] = "Values between " + ofl + " and " + ifl + " are mild outliers on the lower end ";
    outlierArray[1] = "Values below " + ofl + " are extreme outliers on the lower end";
    outlierArray[2] = "Values between " + ifh + " and " + ofh + " are mild outliers on the higher end";
    outlierArray[3] = "Values above " + ofh + " are extreme outliers on the higher end";
    return outlierArray;
}
/**
 * The dataset is inputted as an array of numbers. The function
 * calculates and returns the values of the outliers in the dataset
 * as well as what kind of outlier it is. If no outliers exist, the
 * function returns "None".
 */
function listOutliers(array) {
    var mildLower = "";
    var mildHigher = "";
    var extremeLower = "";
    var extremeHigher = "";
    var Q1val = Q1(array);
    var Q3val = Q3(array);
    var iqrVal = iqr(array);
    var ifl = Q1val - (1.5 * iqrVal);
    var ifh = Q3val + (1.5 * iqrVal);
    var ofl = Q1val - (3 * iqrVal);
    var ofh = Q3val + (3 * iqrVal);
    for (i = 0; i < array.length; i++) {
        if (array[i] < ifl && array[i] > ofl) {
            mildLower = mildLower + " " + array[i];
        } else if (array[i] <= ofl) {
            extremeLower = extremeLower + " " + array[i];
        } else if (array[i] > ifh && array[i] < ofh) {
            mildHigher = mildHigher + " " + array[i];
        } else if (array[i] >= ofh) {
            extremeHigher = extremeHigher + " " + array[i];
        }
    }
    if (mildLower == "" || array.length == 1) {
        mildLower = "None";
    }
    if (extremeLower == ""|| array.length == 1) {
        extremeLower = "None";
    }
    if (mildHigher == ""|| array.length == 1) {
        mildHigher = "None";
    }
    if (extremeHigher == ""|| array.length == 1) {
        extremeHigher = "None";
    }
    var outlierArray = [];
    outlierArray[0] = "Mild Lower: " + mildLower;
    outlierArray[1] = "Extreme Lower: " + extremeLower;
    outlierArray[2] = "Mild Higher: " + mildHigher;
    outlierArray[3] = "Extreme Higher: " + extremeHigher;
    return outlierArray;
}


/**
 * The dataset is inputted as an array of numbers. The function
 * calculates and returns the maximum value of the dataset.
 */
function max(array) {
    var maxVal = array[0];
    for (i = 0; i < array.length; i++) {
        if (array[i] > maxVal) {
            maxVal = array[i];
        }
    }
    return maxVal;

}

/**
 * The dataset is inputted as an array of numbers. The function
 * calculates and returns the minimum value of the dataset.
 */
function min(array) {
    var minVal = array[0];
    for (i = 0; i < array.length; i++) {
        if (array[i] < minVal) {
            minVal = array[i];
        }

    }
    return minVal;
}

/**
 * The dataset is inputted as an array of numbers. The function
 * calculates and returns a sorted version of the dataset.
 */
function datasetSort(array) {
    return array.sort(function(a, b){return a-b});
}
/**
 * This function takes data from the text area from the web page
 * and runs all of the functions. The results of the functions are
 * then added to the tables on the webpage.
 */
function numDatSumMain() {
    var data = document.getElementById('Enter Data here').value;
    var array = data.split(",");
    array = datasetSort(array);
    for (i = 0; i < array.length; i++) {
        array[i] = Number(array[i]);
    }
    document.getElementById('meanText').innerHTML = mean(array);
    document.getElementById('medianText').innerHTML = median(array);
    document.getElementById('modeText').innerHTML = mode(array);
    document.getElementById('stddevText').innerHTML = stdDev(array);
    document.getElementById('rangeText').innerHTML = range(array);
    document.getElementById('Q1Text').innerHTML = Q1(array);
    document.getElementById('Q3Text').innerHTML = Q3(array);
    document.getElementById('iqrText').innerHTML = iqr(array);
    document.getElementById('maxText').innerHTML = max(array);
    document.getElementById('minText').innerHTML = min(array);
    document.getElementById('skewText').innerHTML = skew(mean(array), median(array));
    document.getElementById('fiveNumSumText').innerHTML = fiveNumSummary(array);
    document.getElementById('outliersText1').innerHTML = outliers(array)[0];
    document.getElementById('outliersText2').innerHTML = outliers(array)[1];
    document.getElementById('outliersText3').innerHTML = outliers(array)[2];
    document.getElementById('outliersText4').innerHTML = outliers(array)[3];
    document.getElementById('listOutliersText1').innerHTML = listOutliers(array)[0];
    document.getElementById('listOutliersText2').innerHTML = listOutliers(array)[1];
    document.getElementById('listOutliersText3').innerHTML = listOutliers(array)[2];
    document.getElementById('listOutliersText4').innerHTML = listOutliers(array)[3];
}




