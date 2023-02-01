# day01

## Git

**本地仓库与远程仓库交互之前，必须先进行本地仓库版本控制**

**一定先进行本地仓库版本控制，再进行其他操作**

### 1. 本地仓库操作

1. 本地仓库版本控制：将所有代码提交到版本区进行版本控制

- `git init` 初始化 git 仓库（一次）
- `git add .` 将工作区代码提交到暂存区保管
- `git commit -m xxx` 将暂存区代码提交到版本区进行版本控制

2. 分支操作

- `git checkout -b xxx` 新建并切换到 xxx 分支
- `git checkout xxx` 切换到 xxx 分支
- `git merge xxx` 在当前分支合并 xxx 分支的内容
- `git branch` 查看所有分支
- `git branch -d xxx` 删除 xxx 分支

### 2. 本地仓库与远程仓库的交互

1. 本地有仓库，远程没有仓库

- 新建远程仓库
- 先进行本地仓库版本控制
  - `git init`
  - `git add .`
  - `git commit -m xxx`
- 本地仓库与远程仓库关联起来
  - `git remote add origin xxx`
- 在将本地仓库代码推送到远程仓库保管
  - `git push -u origin master`
  - 只有 master 分支推送指令可以简写 `git push`
- 本地新建开发分支
  - `git checkout -b xxx`
- 在开发分支代码推送到远程仓库保管
  - `git push origin xxx`

2. 远程有仓库，本地没有仓库（去公司入职场景）

- `git clone xxx` 将远程仓库克隆到本地来 (公司需要提供克隆仓库地址，账号和密码)
- `cd xxx` 进入仓库内
- `git fetch origin xxx:xxx` 将远程仓库 xxx 分支拉取到本地仓库 xxx 分支上来（本地仓库没有 xxx 分支会自动创建）
- `git checkout xxx` 切换到 xxx 分支，将来进行开发

3. 常见问题

- 问题：拉取老师远程仓库代码报错

  - 原因：本地修改老师代码，老师也修改远程代码，出现冲突，就会报错
  - 解决：
    - `git reset --hard HEAD^` 回退到上一个版本
    - `git pull origin xxx` 重新拉取老师代码

- 问题：不清楚代码是否进行了本地仓库版本控制
  - 解决：
    - `git status`
    - 红色位于工作区
    - 绿色位于暂存区
    - 没有就是版本区
