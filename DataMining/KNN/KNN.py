#coding=utf8
from numpy import *
import operator

def creatDataSet():
    group = array([[1.0,1.1],[1.0,1.0],[0,0],[0,0.1]])
    labels = ['A','A','B','B']
    return group,labels
def classify0(inX,dataset,labels,k):
    '''计算所给已经知道类别的数据的大小'''
    dataSetSize = dataset.shape[0]
    '''通过复制出和样本一样大小的测试数据，减，平方，求和，开方 计算距离'''
    diffMat = tile(inX,(dataSetSize,1)) - dataset
    sqDiffMat = diffMat**2
    sqDistances = sqDiffMat.sum(axis=1)
    distances = sqDistances**0.5
    '''按距离从小到大排序'''
    sortedDistIndicies = distances.argsort()
    '''取出前k个 统计其所属的类别'''
    classCount={}
    for i in range(k):
        voteIlabel = labels[sortedDistIndicies[i]]
        classCount[voteIlabel] = classCount.get(voteIlabel,0)+1
    '''按类别出现的次数从大到小排序 '''
    sortedClassCount = sorted(classCount.iteritems(),key=operator.itemgetter(1),reverse=True)
    return sortedClassCount[0][0]

group,labels = creatDataSet();
print classify0([0,0],group,labels,3)
