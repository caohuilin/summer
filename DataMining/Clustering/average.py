#coding=utf8
from numpy import *
def loadDateSet(fileName): #将文本文件导入到一个列表中
    dataMat = []
    fr = open(fileName)
    for line in fr.readlines():
        curLine = line.strip().split('\t')
        fltLine = map(float,curLine)
        dataMat.append(fltLine)
    return dataMat
    #计算两个点的欧拉距离
def distEclud(vecA,vecB):
    return sqrt(sum(power(vecA - vecB,2)))
#为给定数据集构建包含k个随心质心的集合
def randCent(dataSet,k):
    n = shape(dataSet)[1]#返回数组的维度 列数
    centroids = mat(zeros((k,n)))# 生成一个K行n列的数组  然后转成矩阵
    for j in range(n):
        minJ = min(dataSet[:,j])#把dataSet的第j列向量求出 然后取最小值
        rangeJ = float(max(dataSet[:,j]) - minJ)
        centroids[:,j] = minJ + rangeJ * random.rand(k,1)
    return centroids
def  KMeans(dataSet,k,disMeas=distEclud,creatCent=randCent):
    m = shape(dataSet)[0]
    clusterAssment = mat(zeros((m,2)))
    centroids = creatCent(dataSet,k)
    clusterChanged = True
    while clusterChanged:
        clusterChanged = False
        for i in range(m):
            minDist = inf
            minIndex = -1
            for j in range(k):
                distJI = disMeas(centroids[j,:],dataSet[i,:])
                if distJI < minDist:
                    minDist = distJI
                    minIndex = j
            if clusterAssment[i,0] != minIndex:
                clusterChanged = True
            clusterAssment[i,:] = minIndex,minDist**2
        print centroids
        for cent in range(k):
            ptsInclust = dataSet[nonzero(clusterAssment[:,0].A==cent)[0]]
            centroids[cent,:] = mean(ptsInclust,axis=0)
    return centroids,clusterAssment
datMat = mat(loadDateSet('testSet.txt'))
myCentorids,clustAssing = KMeans(datMat,4)
