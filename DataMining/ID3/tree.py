#coding=utf8
from math import log

def createDataSet():
   dataSet = [[1,1,'yes'],[1,1,'yes'],[1,0,'no'],[0,1,'no'],[0,1,'no']]
   labels = ['no surfacing','flippers']
   return dataSet,labels
'''计算给定数据集的香农熵'''
def calcShannonEnt(dataSet) :
    numEntries = len(dataSet)
    labelCounts = {}
    for featVec in dataSet:
        currentLabel = featVec[-1]
        '''取最后一列的数值 在这里为yes yes no no no'''
        if currentLabel not in labelCounts.keys():
            labelCounts[currentLabel] = 0
        labelCounts[currentLabel] += 1
    shannonEnt = 0.0
    for key in labelCounts:
        prob = float(labelCounts[key])/numEntries
        shannonEnt -= prob * log(prob,2)
    return shannonEnt
'''按照给定特征划分数据集'''
def splitDataSet(dataSet,axis,value):
    retDataSet = []
    '''遍历整个待划分数据集，将对应特征值等于所需的其他属性合并存储'''
    for featVec in dataSet:
        if featVec[axis] == value:
            reduceFeatVec  = featVec[:axis]
            '''提取前axis个元素'''
            reduceFeatVec.extend(featVec[axis+1:])
            retDataSet.append(reduceFeatVec)
    return retDataSet

def chooseBestFeatureTosplit(dataSet):
    numFeatures = len(dataSet[0])-1
    baseEntropy = calcShannonEnt(dataSet)
    bestInfoGain = 0.0;
    bestFeature = -1;
    for i in range(numFeatures):
        '''取出数据集中所有的第i项元素'''
        featList = [example[i] for example in dataSet]
        '''set 去除重复对象'''
        uniqueVals = set(featList)
        newEntropy = 0.0
        for value in uniqueVals:
            subDataSet = splitDataSet(dataSet,i,value)
            prob = len(subDataSet)/float(len(dataSet))
            newEntropy += prob * calcShannonEnt(subDataSet)
        infoGain = baseEntropy - newEntropy
        if infoGain > bestInfoGain:
            bestInfoGain = infoGain
            bestFeature = i
    return bestFeature

def majorityCnt(classList):
    classCount={}
    for vote in classList:
        if vote not in classCount.key(0):
            classCount[vote] = 0
        classCount[vote]+=1;
    sortedClassCount = sorted(classCount,iteritems(),key=operator.itemgetter(1),reverse=True)
    return sortedClassCount
def createTree(dataSet,labels):
    classList = [example[-1] for example in dataSet]
    if classList.count(classList[0]) ==len(classList):
        return classList[0]
    '''排序返回分类次数最多的分类名称'''
    if len(classList[0]) == 1:
        return majorityCnt(classList)
    bestFeat = chooseBestFeatureTosplit(dataSet)
    bestFeatLabel = labels[bestFeat]
    myTree = {bestFeatLabel:{}}
    del(labels[bestFeat])
    featValues = [example[bestFeat] for example in dataSet]
    uniqueVals = set(featValues)
    for value in uniqueVals:
        subLabels = labels[:]
        myTree[bestFeatLabel][value] = createTree(splitDataSet(dataSet,bestFeat,value),subLabels)
    return myTree

myDat,labels = createDataSet()
print createTree(myDat,labels)
